import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout.js'
import {PageHeader, SectionHeader} from '../components/headers.js'
import {Calendar} from '../components/calendar.js'
import {CalendarTabs} from '../components/tabBar.js'
import {TaskList} from '../components/taskList.js'

import SignIn from './signin.js'

// const tasksByMonth = [
//   [{title:"Clean gutter", difficulty:"Average", time:"2-4 hours", tag3:"Exterior", description:"Remove leaves and other debris"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Clean fireplace", difficulty:"Simple", time:"20-30 minutes", tag3:"Systems", description:"Remove ash and scrub tray"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"June Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"July Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//     {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"August Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"September Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//     {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"OctoberFertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}]
// ];
//
// const tasksByMonthRoof = [
//   [{title:"Wash roof", difficulty:"Average", time:"3-7 hours", tag3:"Exterior", description:"Clean off moss and algae"},
//                   {title:"Clean gutter", difficulty:"Average", time:"2-4 hours", tag3:"Exterior", description:"Remove leaves and other debris"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Clean fireplace", difficulty:"Simple", time:"20-30 minutes", tag3:"Systems", description:"Remove ash and scrub tray"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//                   {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"June Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"July Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//     {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"August Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"September Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
//     {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}],
//   [{title:"OctoberFertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}]
// ];

export default function Dashboard({session}) {
  const contextValue = useContext(AppContext);

  if (contextValue.state.loggedIn) {
    const user = supabase.auth.user();
    const [username, setUsername] = useState(null)
    const [tasks, setTasks] = useState([])
    const tasks1 = []

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
      else {
        tasks1.push(tasks)
        setTasks(tasks1)
      }
      console.log(tasks)
    }

    useEffect(() => {
      getProfile()
    }, [session])

    async function getProfile() {
        let {data} = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single()
        setUsername(data.username);
        contextValue.setUsername(data.username);
    }

    async function addRow(name) {
      try {
        const user = supabase.auth.user()

        let {data: fID} = await supabase.from('HomeFeatures').select('id').eq('FeatureName', name).single()
        const updates = {
          UserID: user.id,
          FeatureID: fID.id,
          tag3: fID.tag3
        }
        let {data} = await supabase.from('UserHome').select('*').eq('FeatureID', fID.id).eq('UserID', user.id)
        console.log(data.length)
        if (data.length == 0) {
          let { error } = await supabase.from('UserHome').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })

          addTasks(fID.id)

          if (error) {
            throw error
          }
        } else {
          alert('Cannot have more than 1 Home Feature of the same type')
        }
      } catch (error) {
        alert(error.message)
      }
    }

    async function addTasks(feaID) {
      try {
        const user = supabase.auth.user()
        let {data: count} = await supabase.from('UserHome').select('FeatureID, id, tag3').eq('UserID', user.id).eq('FeatureID', feaID)
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
              UserID: user.id,
              time: task.time,
              tag3: ftID.tag3
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

    var tasksTEMP = [tasks, tasks, tasks, tasks, tasks, tasks]

    return (
      <div>
        <Head>
          <title>UCHI | Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className="pageContent">
            <PageHeader page={"dashboard"} headertext={"Welcome, " + contextValue.state.username + "!"} />
            <SectionHeader iconpath="/icons/calendar_duotone.png" headertext={"2022"} />
            <CalendarTabs tabs={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]} tabContent={tasks} />
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
  } else {
    return(<SignIn/>)
  }

  // return (
  //   <div>
  //     <Head>
  //       <title>UCHI | Dashboard</title>
  //       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  //     </Head>
  //     <Layout>
  //       <div className="pageContent">
  //         <PageHeader page={"dashboard"} headertext={"Welcome, " + user + "!"} />
  //         <SectionHeader iconpath="/icons/calendar_duotone.png" headertext={"2022"} />
  //         <Calendar months={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]} />
  //         <SectionHeader iconpath="/icons/tasks_duotone.png" headertext="March Tasks" />
  //         <TaskList dashboard={true} tasks={tasks} />
  //       </div>
  //     </Layout>
  //   </div>
  // )
}
