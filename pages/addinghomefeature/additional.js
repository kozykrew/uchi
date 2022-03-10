import Head from 'next/head'
import Form from 'react-bootstrap/Form'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

export default function Additional() {
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
              <AddHFHeader name="Refrigerator" previous="/addinghomefeature/type" />
            </div>
          </div>
          <div className="pageContent">
            <div className={addingStyles.prompt}>
              <h2 className="textDark">Does your Refrigerator have a built-in ice maker?</h2>
              <Form>
                <Form.Check inline label="Yes" name="group1" type="radio" />
                <Form.Check inline label="No" name="group1" type="radio" />
              </Form>
            </div>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" next="/addinghomefeature/confirmation" />
      </Layout>
    </div>
  )
}
