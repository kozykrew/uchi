import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TaskList} from '../components/taskList.js'

import SignIn from './signin.js'

import styles from '../components/details.module.css'



const mgTasksRefrigerator = [{title:"Fill Refrigerator", difficulty:"Simple", frequency:"Occasionally"},
                {title:"Refresh ice maker", difficulty:"Simple", frequency:"Quarterly"},
                {title:"Clean coils", difficulty:"Simple", frequency:"Annually"}];

const mgTasksRoof = [{title:"Wash Roof", difficulty:"Average", time:"3-7 hours", tag3:"May 2022"}]

const additionalRefrigerator = [{header:"Has built-in ice maker?", data:"yes"}]
const additionalRoof = [];

export default function HomeFeatureDetails() {
  const contextValue = useContext(AppContext);
  const [tasks, setTasks] = useState([])

  if (contextValue.state.loggedIn) {

    const user = supabase.auth.user();
    const router = useRouter();
    const addHF = router.query.homeFeatureName
    const addHFiconpath = "/icons/hf_" + addHF.toLowerCase() + "_lg.svg"; 
    
    useEffect(() => {
      fetchTasks()
    }, [])
    const fetchTasks = async () => {
      let { data: tasks, error } = await supabase.from('UserTasks').select(`
      *,
      UserHome!inner(*)
      `)
      .eq('UserHome.userID', user.id)
      .eq('UserHome.featureName', addHF)
      if (error) console.log('error', error)
      else {
        setTasks(tasks)
      }
    }



    return (
      <div className={styles.chocolate60bg}>
        <Head>
          <title>UCHI | Home Feature Details</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className={styles.chocolate60bg}>
            <div className={styles.detailsContainer}>
              <div className="pageContent">
                <DetailsHeader type="hf" name={addHF} iconpath={addHFiconpath} />
                <div className={styles.mainDetailsContainer}>
                  <MainDetailsTable type="hf" hf={addHF} additional={additionalRoof} />
                </div>
              </div>
            </div>
            <div className={styles.detailsContainerDetailsPagesDesktop}>
              <div className="pageContent">
                <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.push("/homefeatures")} />
                <div className={styles.addHFHeaderDesktop}>
                  <img className={styles.addHFHeaderDesktopIcon} src={addHFiconpath} alt={addHF} />
                  <div>
                    <h1>{addHF}</h1>
                    <p className="smallHeader">Average Lifespan: 20-30 years</p>
                  </div>
                  <div className={styles.mainDetailsContainer}>
                    <MainDetailsTable type="hf" hf={addHF} additional={additionalRoof} />
                  </div>
                </div>
              </div> 
            </div>
            <div className="pageContent">
              <h2>Maintenance Guide</h2>
              <TaskList dashboard={false} tasks={tasks} />
            </div>
          </div>
          <div className={styles.chocolate60filler}>
          </div>
        </Layout>
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}
