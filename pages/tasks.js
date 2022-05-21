import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {TaskList} from '../components/taskList.js'
import {TabBar} from '../components/tabBar.js'

import SignIn from './signin.js'

const tasksByStatus = [[{id: 0, title:"Wash roof", difficulty:"Average", time:"3-7 hours", tag3:"Exterior", description:"Clean off moss and algae"},
                {id: 1, title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
                {id: 2, title:"Clean fireplace", difficulty:"Simple", time:"20-30 minutes", tag3:"Systems", description:"Remove ash and scrub tray"},
                {id: 3, title:"Clean gutter", difficulty:"Average", time:"2-4 hours", tag3:"Exterior", description:"Remove leaves and other debris"}],

                [{title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Simple", time:"20-30 minutes", tag3:"Exterior", description:"Feed lawn with nutrients"}]];

// export default function Tasks() {
//   return (
//     <div>
//       <Head>
//         <title>UCHI | Tasks</title>
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>
//       <Layout>
//         <div className="pageContent">
//           <PageHeader iconpath="/icons/todo_gradient.png" headertext={"Tasks"} />
//           <TabBar type="tasks" tabs={["In Progress", "Upcoming", "Completed"]} tabContent={tasksByStatus} />
//         </div>
//       </Layout>
//     </div>
//   )
// }

export default function Tasks() {
  const contextValue = useContext(AppContext);

  const [completedTasks, setCompletedTasks] = useState([])
  const [notTasks, setNotTasks] = useState([])
  var user;

  useEffect(() => {
    if (contextValue.state.loggedIn) {
      fetchCompletedTasks()
    }
  }, []);
  const fetchCompletedTasks = async () => {
    let { data: completedTasks, error } = await supabase.from('UserTasks').select(`
    *,
    UserHome!inner(*)`)
    .eq('UserHome.userID', user.id)
    .eq('taskStatus', true)
    if (error) console.log('error', error)
    else setCompletedTasks(completedTasks)
  }

  useEffect(() => {
    if (contextValue.state.loggedIn) {
      fetchNotTasks()
    }
  }, []);
  const fetchNotTasks = async () => {
    let { data: notTasks, error } = await supabase.from('UserTasks').select(`
    *,
    UserHome!inner(*)`)
    .eq('UserHome.userID', user.id)
    .eq('taskStatus', false)
    if (error) console.log('error', error)
    else setNotTasks(notTasks)
  }

  if (contextValue.state.loggedIn) {
    user = supabase.auth.user()

    tasksByStatus[0] = notTasks
    tasksByStatus[1] = completedTasks

    return (
      <div>
        <Head>
          <title>UCHI | Tasks</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className="pageContent">
            <PageHeader page={"tasks"} headertext={"Tasks"} />
            {/* <TaskList dashboard={false} tasks={tasksByStatus[0]} /> */}
            <TabBar type="tasks" tabs={["In Progress", "Completed"]} tabContent={tasksByStatus} />
          </div>
        </Layout>
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}
