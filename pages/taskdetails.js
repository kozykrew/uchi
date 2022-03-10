import {useState} from 'react'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabBar.js'

import styles from '../components/details.module.css'

const task = {
  name:"Clean gutters",
  space:"Exterior",
  difficulty:"Easy",
  time:"2 hours",
  frequency:"Annual",
  desc:"When gutters fill with leaves, sticks, and other debris, it causes clogs that can result in water creeping into the roof or even into the foundation of the house.",
  uchirec:"DIY this task because it is more cost-efficient.",
  tools:["Bucket", "Garden hose", "Ladder", "Trowel"],
  steps:[[{title:"Set up ladder", description:"Set your ladder against a sturdy surface (do not lean it against the gutters!)."},
                  {title:"Remove gunk", description:"Use your trowel or scooping tool to remove gunk from gutters."},
                  {title:"Collect gunk", description:"Fill a bucket with the gutter gunk or spread a tarp underneath your workspace to collect the gunk."},
                  {title:"Flush the gutters", description:"Use a garden hose to flush out the gutters and clear out any remaining debris."}],
                [{title:"Interview contractors", description:"Ask key questions to determine their reliability."}]]
}

export default function TaskDetails() {
  // progress bar state
  const [ value, setValue ] = useState(0);
  // checkbox state
  const [ isChecked, setChecked ] = useState(false);

  const handleComplete = (e) => {
    setValue(1);
    setChecked(true);
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
              <DetailsHeader type="task" name={task.name} value={value} handleComplete={handleComplete} />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="task" space={task.space} difficulty={task.difficulty} time={task.time} frequency={task.frequency} />
                <hr className={styles.hr} />
                <p className={styles.purpose}>{task.desc}</p>
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
