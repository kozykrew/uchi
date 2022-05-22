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
  var user;

  const [username, setUsername] = useState(null)
  const [tasks, setTasks] = useState([])
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

  if (contextValue.state.loggedIn) {
    user = supabase.auth.user();

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
