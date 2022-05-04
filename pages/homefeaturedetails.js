import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TaskList} from '../components/taskList.js'

import styles from '../components/details.module.css'

const tasks = [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}]

const mgTasks = [{title:"Fill Refrigerator", difficulty:"Easy", frequency:"Occasionally"},
                {title:"Refresh ice maker", difficulty:"Easy", frequency:"Quarterly"},
                {title:"Clean coils", difficulty:"Easy", frequency:"Annually"}];

const additional = [{header:"Has built-in ice maker?", data:"yes"}]

export default function HomeFeatureDetails() {
  const router = useRouter();
  
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
              <DetailsHeader type="hf" name="Refrigerator" />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="hf" additional={additional} />
              </div>
            </div>
          </div>
          <div className={styles.detailsContainerDetailsPagesDesktop}>
            <div className="pageContent">
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.push("/homefeatures")} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src="../icons/hf_refrigerator_lg.svg" alt="Refrigerator" />
                <div>
                  <h1>Refrigerator</h1>
                  <p className="smallHeader">Average Lifespan: 10 years</p>
                </div>
                <div className={styles.mainDetailsContainer}>
                  <MainDetailsTable type="hf" additional={additional} />
                </div>
              </div>
            </div>
          </div>
          <div className="pageContent">
            <h2>Maintenance Guide</h2>
            <TaskList dashboard={false} tasks={mgTasks} />
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
      </Layout>
    </div>
  )
}
