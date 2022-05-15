import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {TabBar} from '../components/tabBar.js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const user = supabase.auth.user()  

const tasksByStatus = [[{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"}],
                [],
                [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}]];



export default function Tasks() {
  const [completedTasks, setCompletedTasks] = useState([])
  useEffect(() => {
    fetchCompletedTasks()
  }, [])
  const fetchCompletedTasks = async () => {
    let { data: completedTasks, error } = await supabase.from('userTasks').select(`
    *,
    UserHome!inner(*)`)
    .eq('UserHome.UserID', user.id)
    .eq('taskStatus', true)
    if (error) console.log('error', error)
    else setCompletedTasks(completedTasks)
  }
  const [notTasks, setNotTasks] = useState([])
  useEffect(() => {
    fetchNotTasks()
  }, [])
  const fetchNotTasks = async () => {
    let { data: notTasks, error } = await supabase.from('userTasks').select(`
    *,
    UserHome!inner(*)`)
    .eq('UserHome.UserID', user.id)
    .eq('taskStatus', false)
    if (error) console.log('error', error)
    else setNotTasks(notTasks)
  }
  tasksByStatus[0] = notTasks
  tasksByStatus[2] = completedTasks
  return (
    <div>
      <Head>
        <title>UCHI | Tasks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/icons/todo_gradient.png" headertext={"Tasks"} />
          <TabBar type="tasks" tabs={["In Progress", "Upcoming", "Completed"]} tabContent={tasksByStatus} />
        </div>
      </Layout> 
    </div>
  )
}
