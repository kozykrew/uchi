import {useState, useContext, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {BtnComplete, BtnPostpone, BtnDelete} from '../components/button.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabBar.js'

import SignIn from './signin.js'

import styles from '../components/details.module.css'

// progress bar component from https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const task1 = {
  name:"Default task",
  space:"Exterior",
  difficulty:"Easy",
  time:"2 hours",
  frequency:"Annually",
  desc:"When gutters fill with leaves, sticks, and other debris, it causes clogs that can result in water creeping into the roof or even into the foundation of the house.",
  uchirec:"DIY this task because it is more cost-efficient.",
  tools:["Bucket", "Garden hose", "Ladder", "Trowel"],
  steps:[[{title:"Set up ladder", description:"Set your ladder against a sturdy surface (do not lean it against the gutters!)."},
                  {title:"Remove gunk", description:"Use your trowel or scooping tool to remove gunk from gutters."},
                  {title:"Collect gunk", description:"Fill a bucket with the gutter gunk or spread a tarp underneath your workspace to collect the gunk."},
                  {title:"Flush the gutters", description:"Use a garden hose to flush out the gutters and clear out any remaining debris."}],
                [{title:"Interview contractors", description:"Ask key questions to determine their reliability."}]]
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

function TaskDetails({ ssrTask }) {
  const contextValue = useContext(AppContext);

  if (contextValue.state.loggedIn) {
    const router = useRouter();
    const user = supabase.auth.user()

    const taskID = router.query.taskid
    const [steps, setSteps] = useState([])
    const [tools, setTools] = useState([])
    var [stepsCompleted, setStepsCompleted] = useState([]);
    const [ progressValue, setProgressValue ] = useState(0);

    useEffect(() => {
      fetchSteps()
    }, [])

    const steps1 = []
    const fetchSteps = async () => {
    let { data: steps} = await supabase.from('UserSteps').select(`*`)
    .eq('userID', user.id)
    .eq('userTasksID', taskID)
    .order('title')
    steps1.push(steps)
    steps1.push([{title:"Interview contractors", description:"Ask key questions to determine their reliability.", stepsStatus: false}])
    setSteps(steps1)

    for (var i = 0; i < steps.length; i++) {
      if (steps[i].stepsStatus) {
        stepsCompleted.push(1);
      } else {
        stepsCompleted.push(0);
      }
    }
    var numerator = 0;
      for (var i = 0; i < stepsCompleted.length; i++) {
        if (stepsCompleted[i] == 1) {
          numerator++;
        }
      }
    var percent = Math.ceil((numerator / stepsCompleted.length)*100);
    setProgressValue(percent);
    }

    const [taske, setTask] = useState([])
    useEffect(() => {
      fetchTasks()
    }, [])
    const fetchTasks = async () => {
      let { data: taske, error } = await supabase.from('UserTasks').select(`
      *,
      UserHome!inner(*)
      `)
      .eq('UserHome.userID', user.id)
      .eq('id', taskID)
      .single()
      if (error) console.log('error', error)
      else {
        setTask(taske)
        setTools(taske.tools)
      }
    }

    // --------- FRONTEND progress bar state
    // const [ progressValue, setProgressValue ] = useState(0);
    //
    // const handleComplete = (e) => {
    //   setProgressValue(100);
    //   var stepsCompleted = [];
    //   for (var i = 0; i < steps.length; i++) {
    //     stepsCompleted.push(1);
    //   }
    //   setStepsComplete(stepsCompleted)
    // }
    // var stepsIncomplete = [];
    // for (var i = 0; i < steps.length; i++) {
    //   stepsIncomplete.push(0);
    // }
    // checkbox state (individually controlled by one state)
    // const [ stepsComplete, setStepsComplete ] = useState(stepsIncomplete);
    // console.log(stepsComplete)

    // const handleProgress = () => {
    //   var numerator = 0;
    //   for (var i = 0; i < stepsComplete.length; i++) {
    //     if (stepsComplete[i] == 1) {
    //       numerator++;
    //     }
    //   }
    //   var percent = Math.round((numerator / stepsComplete.length)*100);
    //   setProgressValue(percent);
    // }

    // --------- BACKEND progress bar state
    const handleComplete = (e) => {
      setProgressValue(100);
      for (var i = 0; i < steps.length; i++) {
        stepsCompleted[i] = 1;
      }
      setStepsCompleted(stepsCompleted)
      toggleTasks()
      toggleSteps()
    }

    const toggleTasks = async () => {
        const { data, error } = await supabase
          .from('UserTasks')
          .update({ taskStatus: 'true' })
          .eq('userID', user.id)
          .eq('id', taskID)
          .single()
    }
    const toggleSteps = async () => {
      for (var i = 0; i < steps[0].length; i++) {
        const { data, error } = await supabase
        .from('UserSteps')
        .update({ stepsStatus: 'true' })
        .eq('userID', user.id)
        .eq('id', steps[0][i].id)
      }
    }

    const handleProgress = () => {
      var numerator = 0;
      for (var i = 0; i < stepsCompleted.length; i++) {
        if (stepsCompleted[i] == 1) {
          numerator++;
        }
      }
      var percent = Math.ceil((numerator / stepsCompleted.length)*100);
      setProgressValue(percent);
      if (numerator == stepsCompleted.length) handleComplete()
    }

    // TO-DO: not yet implemented in database?
    var uchirec = (<p><span className="brand">UCHI</span> recommends to {task1.uchirec}</p>)

    return (
      <div className={styles.chocolate80bg}>
        <Head>
          <title>UCHI | Task Details</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className={styles.chocolate80filler}>
            <div className={styles.detailsContainer}>
              <div className="pageContent">
                <DetailsHeader type="task" name={taske.title} progressValue={progressValue} handleComplete={handleComplete} />
                <div className={styles.mainDetailsContainer}>
                  <MainDetailsTable type="task" space={taske.tag3} difficulty={taske.difficulty} time={taske.time} frequency={task1.frequency} />
                  <hr className={styles.hr} />
                  <p className={styles.purpose}>{taske.description}</p>
                </div>
              </div>
            </div>

            <div className={styles.detailsContainerDetailsPagesDesktop}>
              <div className="pageContent">
                <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
                <div className={styles.addHFHeaderDesktop}>
                  <div>
                    <h1>{taske.title}</h1>
                    <div>
                      <BtnComplete handleComplete={handleComplete} />
                      <div className={styles.actionBtnContainerDesktop}>
                        <BtnPostpone />
                        <BtnDelete />
                      </div>
                    </div>
                  </div>
                  <CircularProgressbar className={styles.progressbar} value={progressValue} maxValue={100} text={progressValue + '%'} />
                  <div className={styles.mainDetailsContainer}>
                    <MainDetailsTable type="task" space={taske.tag3} difficulty={taske.difficulty} time={taske.time} frequency={task1.frequency} />
                    <hr className={styles.hr} />
                    <p className={styles.purpose}>{taske.f_description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pageContent">
              <h2>How To</h2>
              {uchirec}
              <TabBar type="steps" tabs={["DIY", "Service"]} tabContent={steps} tools={tools} stepsComplete={stepsCompleted} setStepsComplete={setStepsCompleted} handleProgress={handleProgress} />
            </div>
          </div>
          <div className={styles.chocolate80filler}>
          </div>
        </Layout>
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}

export default TaskDetails
