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
  const router = useRouter();
  console.log(router.query.hf)
  var user;
  const [tasks, setTasks] = useState([]);

  var addHF = router.query.hf;
  var displayHF = addHF.charAt(0).toUpperCase() + addHF.slice(1);
  var addHFiconpath = "";

  const [feature, setFeature] = useState([])
  const [featureType, setFeatureType] = useState('')
  const [featureAge, setFeatureAge] = useState('')
  const [featureBrand, setFeatureBrand] = useState('')
  const [featureModel, setFeatureModel] = useState('')

  useEffect(() => {
    if (contextValue.state.loggedIn) {
      user = supabase.auth.user();
      fetchFeature()
    }
  }, []);
  const fetchFeature = async () => {
    let { data: feature, error } = await supabase.from('UserHome').select(`
    *`)
    .eq('userID', user.id)
    .eq('featureName', addHF)
    if (error) console.log('error', error)
    else {
      setFeature(feature)
      setFeatureType(feature[0].featureType)
      setFeatureAge(feature[0].age)
      setFeatureBrand(feature[0].brand)
      setFeatureModel(feature[0].modelNo)
    }
  }

  useEffect(() => {
    if (contextValue.state.loggedIn) {
      user = supabase.auth.user();
      addHF = router.query.hf;
      addHFiconpath = "/icons/hf_" + addHF + "_lg.svg";
      console.log(addHFiconpath)
      fetchTasks()
    }
  }, []);
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

  if (contextValue.state.loggedIn) {


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
                <DetailsHeader type="hf" name={displayHF} iconpath={addHFiconpath} />
                <div className={styles.mainDetailsContainer}>
                  <MainDetailsTable type="hf" hf={displayHF} additional={additionalRoof}
                    featureType={featureType} featureBrand={featureBrand} featureModel={featureModel} featureAge={featureAge} />
                </div>
              </div>
            </div>
            <div className={styles.detailsContainerDetailsPagesDesktop}>
              <div className="pageContent">
                <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.push("/homefeatures")} />
                <div className={styles.addHFHeaderDesktop}>
                  <img className={styles.addHFHeaderDesktopIcon} src={addHFiconpath} alt={addHF} />
                  <div>
                    <h1>{displayHF}</h1>
                    <p className="smallHeader">Average Lifespan: 20-30 years</p>
                  </div>
                  <div className={styles.mainDetailsContainer}>
                    <MainDetailsTable type="hf" hf={displayHF} additional={additionalRoof}
                      featureType={featureType} featureBrand={featureBrand} featureModel={featureModel} featureAge={featureAge} />
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
