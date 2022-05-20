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

  const [username, setUsername] = useState(null)
  const [tasks, setTasks] = useState([])
  const user = supabase.auth.user()


  

  if (contextValue.state.loggedIn) {
    const user = supabase.auth.user();
    const tasks1 = [];

    useEffect(() => {
      if (contextValue.state.loggedIn) {
        fetchTasks()
      }
    }, []);

    const fetchTasks = async () => {
      let { data: tasks, error } = await supabase.from('UserTasks').select(`
      *,
      UserHome!inner(*)
      `)
      .eq('UserHome.userID', user.id)
      if (error) console.log('error', error)
      else {
        tasks1.push(tasks)
        setTasks(tasks1)
      }
    }

    useEffect(() => {
      if (contextValue.state.loggedIn) {
        getProfile()
      }
    }, [session]);
  
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

        let {data: fID} = await supabase.from('HomeFeatures').select('*').eq('featureName', name).single()
        console.log(data)
        const updates = {
          userID: user.id,
          featureID: fID.id,
          tag3: fID.tag3,
          featureName: fID.featureName,
          featureType: fID.featureType
        }
        let {data} = await supabase.from('UserHome').select('*').eq('featureID', fID.id).eq('userID', user.id)

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
        let {data: count} = await supabase.from('UserHome').select('featureID, id, tag3').eq('userID', user.id).eq('featureID', feaID)
        count.map(async (ftID) => {
          console.log(ftID)
          let {data: list} = await supabase.from('tasks').select('*').eq('homeFeatureID', ftID.featureID)
          list.map(async (task) => {
            const updates = {
              userHomeID: ftID.id,
              taskID: task.id,
              taskStatus: false,
              title: task.title,
              difficulty: task.difficulty,
              description: task.description,
              userID: user.id,
              time: task.time,
              tag3: ftID.tag3,
              f_description: task.f_description,
              tools: task.tools
            }
            let { error } = await supabase.from('UserTasks').upsert(updates, {
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

        let {data: count} = await supabase.from('UserTasks').select('taskID, id, userID').eq('userID', user.id).eq('taskID', taskID)
        count.map(async (tID) => {
          let {data: list} = await supabase.from('steps').select('*').eq('taskID', tID.taskID).order('title')
          list.map(async(steps) => {
            const updates = {
              userTasksID: tID.id,
              taskID: taskID,
              stepsStatus: false,
              title: steps.title,
              description: steps.description,
              userID: user.id
            }
            let { error } = await supabase.from('UserSteps').upsert(updates, {
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

    // var tasksByMonth = [tasks, []]
    // console.log(tasksByMonth)

    return (
      <div>
        <Head>
          <title>UCHI | Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className="pageContent">
            <PageHeader page={"dashboard"} headertext={"Welcome, " + contextValue.state.username + "!"} />
            <SectionHeader iconpath="/icons/calendar_duotone.svg" headertext={"2022"} />
            <CalendarTabs tabs={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]} tabContent={tasks} />
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
