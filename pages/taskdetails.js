import {useState, useContext} from 'react'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {BtnComplete, BtnPostpone, BtnDelete} from '../components/button.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabBar.js'

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

function TaskDetails({ ssrTask }) {
  const router = useRouter();
  const contextValue = useContext(AppContext);
  let task = task1;
  // Alternatively, only save task ID in AppContext,
  //   then fetch details by task ID here with useEffect
  //   https://www.learnbestcoding.com/post/25/nextjs-how-to-use-getserversideprops

  console.log(contextValue.state.task)

  if (contextValue.state.task != undefined) {
    task = contextValue.state.task;
  }

  console.log(task)

  // progress bar state
  const [ progressValue, setProgressValue ] = useState(0);

  const handleComplete = (e) => {
    setProgressValue(1);
    setChecked(true);
  }

  // checkbox state
  const [ isChecked, setChecked ] = useState(false);

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
              <DetailsHeader type="task" name={task.name} progressValue={progressValue} handleComplete={handleComplete} />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="task" space={task.space} difficulty={task.difficulty} time={task.time} frequency={task.frequency} />
                <hr className={styles.hr} />
                <p className={styles.purpose}>{task.desc}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailsContainerDetailsPagesDesktop}>
            <div className="pageContent">
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <div>
                  <h1>{task.name}</h1>
                  <div>
                    <BtnComplete handleComplete={handleComplete} />
                    <div className={styles.actionBtnContainerDesktop}>
                      <BtnPostpone />
                      <BtnDelete />
                    </div>
                  </div>
                </div>
                <CircularProgressbar className={styles.progressbar} value={progressValue} maxValue={1} text={progressValue*100 + '%'} />
                <div className={styles.mainDetailsContainer}>
                  <MainDetailsTable type="task" space={task.space} difficulty={task.difficulty} time={task.time} frequency={task.frequency} />
                  <hr className={styles.hr} />
                  <p className={styles.purpose}>{task.desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pageContent">
            <h2>How To</h2>
            <p><span className="brand">UCHI</span> recommends to {task.uchirec}</p>
            <TabBar type="steps" tabs={["DIY", "Service"]} tabContent={task.steps} tools={task.tools} handleComplete={handleComplete} isChecked={isChecked} />
          </div>
        </div>
        <div className={styles.chocolate80filler}>
        </div>
      </Layout>
    </div>
  )
}

// getServerSideProps pre-renders the page on each request using the data it returns
// Documentation: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// Tutorial: https://www.youtube.com/watch?v=cPqG8-NoxM0
// export async function getServerSideProps() {
//   const contextValue = useContext(AppContext);
//   let data = contextValue.state.task;
//   // fetch data
//   // const response = await fetch('');
//   // const data = await response.json();
//
//   // pass data to the page via props
//   return {
//     props: {
//       task: data
//     }
//   }
// }

export default TaskDetails
