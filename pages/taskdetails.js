import {useState} from 'react'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabBar.js'
import { useRouter } from 'next/router'
import styles from '../components/details.module.css'
import { useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


const task = {
  name:"Clean gutters",
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
const user = supabase.auth.user()
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default function TaskDetails() {
  const router = useRouter();
  const taskID = router.query.taskid
  const [steps, setSteps] = useState([])
  
  useEffect(() => {
    fetchSteps()
  }, []) 
  const steps1 = []
  const fetchSteps = async () => {
  let { data: steps} = await supabase.from('userSteps').select(`*`)
  .eq('UserID', user.id)
  .eq('userTasksID', taskID)
  .order('title')     
  steps1.push(steps)
  steps1.push([{title:"Interview contractors", description:"Ask key questions to determine their reliability.", stepsStatus: false}])
  setSteps(steps1)
  }
  
  // progress bar state
  const [ value, setValue ] = useState(0);
  // checkbox state
  const [ isChecked, setChecked ] = useState(false);

  const handleComplete = (e) => {
    setValue(1);
    setChecked(true);
  }
  
  const [taske, setTask] = useState([])
  useEffect(() => {
    fetchTasks()
  }, [])
  const fetchTasks = async () => {
    let { data: taske, error } = await supabase.from('userTasks').select(`
    *,
    UserHome!inner(*)
    `)
    .eq('UserHome.UserID', user.id)
    .eq('id', taskID)
    .single()
    if (error) console.log('error', error)
    else setTask(taske)   
  }

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
              <DetailsHeader type="task" name={taske.title} value={value} handleComplete={handleComplete} />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="task" space={task.space} difficulty={taske.difficulty} time={task.time} frequency={task.frequency} />
                <hr className={styles.hr} />
                <p className={styles.purpose}>{taske.description}</p>
              </div>
            </div>
          </div>
          <div className="pageContent">
            <h2>How To</h2>
            <p><span className="brand">UCHI</span> recommends to {task.uchirec}</p>
            <TabBar type="steps" tabs={["DIY", "Service"]} tabContent={steps} tools={task.tools} handleComplete={handleComplete} isChecked={isChecked} />
          </div>
        </div>
        <div className={styles.chocolate80filler}>
        </div>
      </Layout>
    </div>
  )
}
