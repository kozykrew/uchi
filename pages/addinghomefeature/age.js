import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {Slider} from '../../components/slider.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

export default function Age() {
  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60filler}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name="Refrigerator" />
            </div>
          </div>
          <div className="pageContent">
            <div className={addingStyles.prompt}>
              <h2 className="textDark">How old is your Refrigerator?</h2>
              <p className="smallHeader textDark">Average Lifespan: 10 years</p>
            </div>
            <Slider max={20} />
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" next="/homefeatures" />
      </Layout>
    </div>
  )
}
