import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader, SectionHeader} from '../components/headers.js'
import {Calendar} from '../components/calendar.js'
import {TaskList} from '../components/taskList.js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


const user = supabase.auth.user()                
export default function Dashboard({session}) {
  const [username, setUsername] = useState(null)
  const [tasks, setTasks] = useState([])
  const [steps, setSteps] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])
  const fetchTasks = async () => {
    let { data: tasks, error } = await supabase.from('userTasks').select(`
    *,
    UserHome!inner(*)
    `)
    .eq('UserHome.UserID', user.id)
    if (error) console.log('error', error)
    else setTasks(tasks)   
  }
  
  // const deleteTasks = async (id) => {
  //   try {
  //     await supabase.from('tasks').delete().eq('id', id)
  //     setTasks(todos.filter((x) => x.id != id))
  //   } catch (error) {
  //     console.log('error', error)
  //   } 
  // } 
    
  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {

      let { data} = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()
      setUsername(data.username);  
  }

  async function addRow(name) {
    try {
      const user = supabase.auth.user()
      
      let {data: fID} = await supabase.from('HomeFeatures').select('id').eq('FeatureName', name).single()
      const updates = {
        UserID: user.id,
        FeatureID: fID.id,
      } 
      let { error } = await supabase.from('UserHome').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      addTasks(fID.id)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } 
  }

  async function addTasks(feaID) {
    try {
      const user = supabase.auth.user()

      let {data: count} = await supabase.from('UserHome').select('FeatureID, id').eq('UserID', user.id).eq('FeatureID', feaID)
      count.map(async (ftID) => {
        console.log(ftID)
        let {data: list} = await supabase.from('tasks').select('*').eq('HomeFeatureID', ftID.FeatureID)
        list.map(async (task) => {
          const updates = {
            userHomeID: ftID.id,
            taskID: task.id,
            taskStatus: false,
            title: task.title,
            difficulty: task.difficulty,
            description: task.description,
            UserID: user.id
          }
          let { error } = await supabase.from('userTasks').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
          addSteps(task.id)
          if (error) {
            throw error
          }
        })
      })       
    } catch (error) {
      alert(error.message)
    } 
  }
  

  async function addSteps(taskID) {
    try {
      const user = supabase.auth.user()

      let {data: count} = await supabase.from('userTasks').select('taskID, id, UserID').eq('UserID', user.id).eq('taskID', taskID)
      count.map(async (tID) => {
        let {data: list} = await supabase.from('steps').select('*').eq('taskID', tID.taskID).order('title')
        list.map(async(steps) => {
          const updates = {
            userTasksID: tID.id,
            taskID: taskID,
            stepsStatus: false,
            title: steps.title,
            description: steps.description,
            UserID: user.id
          }
          let { error } = await supabase.from('userSteps').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
          if (error) {
            throw error
          }            
        })
      })      
    } catch (error) {
      alert(error.message)
    } 
  } 
  
  return (
    <div>
      <Head>
        <title>UCHI | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath={"/icons/dashboard_gradient.png"} headertext={"Welcome, " + username + "!"} />
          <SectionHeader iconpath="/icons/calendar_duotone.png" headertext={"2022"} />
          <Calendar months={["Mar", "Apr", "May", "Jun", "Jul"]} />
          <SectionHeader iconpath="/icons/tasks_duotone.png" headertext="March Tasks" />
          <TaskList dashboard={true} tasks={tasks} />
          <button className="button block" onClick={() => addRow("Lawn")}>
          Add lawn and user id to UserFeature column
        </button>
        <button className="button block" onClick={() => addRow("Refrigerator")}>
          Add refrigerator and user id to UserFeature column
        </button>
        </div>  
      </Layout>
    </div>
  )
}
