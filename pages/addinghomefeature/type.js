import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import TypeCards from '../../components/typeCards.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

export default function Type() {
  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60bg}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name="Refrigerator" previous={"/homefeatures"} />
            </div>
          </div>
          <div className="pageContent">
            <div className={addingStyles.prompt}>
              <h2 className="textDark">What type of Refrigerator do you have?</h2>
            </div>
            <TypeCards>
            </TypeCards>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" next="/addinghomefeature/age" />
      </Layout>
    </div>
  )
}
