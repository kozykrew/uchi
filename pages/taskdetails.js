import Head from 'next/head'
import Layout from '../components/layout.js'
import {SectionHeader, DetailsHeader} from '../components/headers.js'
import {MainDetailsTable} from '../components/mainDetailsTable.js'
import {TabBar} from '../components/tabbar.js'

import styles from '../components/details.module.css'

const user = 'KozyKrew'

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
              <DetailsHeader type="task" name="Fertilize Lawn" />
              <div className={styles.mainDetailsContainer}>
                <MainDetailsTable type="task" />
                <hr className={styles.hr} />
                <p className={styles.purpose}>Fertilizing the lawn will help it stay green and grow thick. This helps prevent weed seeds from sprouting and moving in.</p>
              </div>
            </div>
          </div>
          <div className="pageContent">
            <h2>How To</h2>
            <TabBar type="steps" tabs={["DIY", "Service"]}/>
          </div>
        </div>
      </Layout>
    </div>
  )
}
