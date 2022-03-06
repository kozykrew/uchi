import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabbar.js'

import styles from '../components/details.module.css'

const steps = [[{title:"Clear debris into buckets", description:"Do this a few days before feeding your lawn to ensure your soil is ready to accept lawn fertilizer."},
                {title:"Flush the gutters", description:"Spreaders fall into two categories: broadcast and drop. Each fertilizer product has a unique spreader setting. Check the bag to make sure you’re selecting the proper setting for your spreader."}],
              [{title:"Interview contractors", description:"Ask key questions to determine their reliability."}]]

export default function TaskDetails() {
  return (
    <div>
      <Head>
        <title>UCHI | Task Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate80bg}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <DetailsHeader type="task" name="Clean gutter" />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="task" />
                <hr className={styles.hr} />
                <p className={styles.purpose}>Cleaning the gutter will prevent sagging, mold, leaks, and rodent infestation. This can lead to costly repairs down the line.</p>
              </div>
            </div>
          </div>
          <div className="pageContent">
            <h2>How To</h2>
            <TabBar type="steps" tabs={["DIY", "Service"]} tabContent={steps} />
          </div>
        </div>
      </Layout>
    </div>
  )
}
