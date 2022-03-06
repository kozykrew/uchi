import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TaskList} from '../components/tasklist.js'

import styles from '../components/details.module.css'

const tasks = [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}]

const tasks2 = [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"}]

const additional = [{header:"Has built-in ice maker?", data:"yes"}]

export default function TaskDetails() {
  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Home Feature Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60filler}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <DetailsHeader type="hf" name="Refrigerator" />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="hf" additional={additional} />
              </div>
            </div>
          </div>
          <div className="pageContent">
            <h2>Maintenance Guide</h2>
            <TaskList dashboard={false} tasks={tasks2} />
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
      </Layout>
    </div>
  )
}
