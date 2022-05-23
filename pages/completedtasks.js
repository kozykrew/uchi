import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {ProfileHeader} from '../components/headers.js'
import {TaskList} from '../components/taskList.js'

import SignIn from './signin.js'

import styles from '../components/details.module.css'
import profileCardStyles from '../components/profileCard.module.css'

export default function CompletedTasks() {
  const contextValue = useContext(AppContext);
  const router = useRouter();

  const [completedTasks, setCompletedTasks] = useState([])
  var user;

  useEffect(() => {
    if (contextValue.state.loggedIn) {
      user = supabase.auth.user()
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

  if (contextValue.state.loggedIn) {
    return (
      <div className={styles.vanillaToastedbg}>
        <Head>
          <title>UCHI | Completed Tasks</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className={styles.vanillaToastedFiller}>
            <div className={styles.detailsContainer}>
              <div className="pageContent">
                <ProfileHeader profileImg="/profile.png" name={contextValue.state.username} home={"New build (December 2021)"} />
              </div>
            </div>
            <div className={styles.detailsContainerDetailsPagesDesktop}>
              <div className="pageContent">
                <div className={styles.addHFHeaderDesktop}>
                  <ProfileHeader profileImg="/profile.png" name={contextValue.state.username} home={"New build (December 2021)"} />
                </div>
              </div>
            </div>
            <div className="pageContent">
              <TaskList dashboard={false} tasks={completedTasks} />
            </div>
          </div>
          <div className={styles.vanillaToastedFiller}>
          </div>
        </Layout>
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}
