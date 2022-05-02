import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Form from 'react-bootstrap/Form'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'
import btnStyles from '../../components/button.module.css'

export default function Additional() {
  const router = useRouter();

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
              <AddHFHeader name="Refrigerator" previous="/addinghomefeature/type" />
            </div>
          </div>
          <div className="pageContent">
            <div className={styles.detailsContainerDesktop}>
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src="../icons/hf_refrigerator_lg.svg" alt="Refrigerator" />
                <h1>Add a Refrigerator</h1>
              </div>
            </div>
            <div className={addingStyles.prompt}>
              <h2 className="textDark">Does your Refrigerator have a built-in ice maker?</h2>
              <Form>
                <Form.Check inline label="Yes" name="group1" type="radio" />
                <Form.Check inline label="No" name="group1" type="radio" />
              </Form>
            </div>
            <div className="addhfprocessbtn-container">
              <Button className={btnStyles.cancelDesktop} onClick={() => router.push("/homefeatures")}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={btnStyles.addDesktop} onClick={() => router.push("/addinghomefeature/confirmation")}>
                <span className="iconFirst">
                  <img src="../icons/carrotbtn_right_line_dark.svg" alt="Next" />
                </span>
                Next
              </Button>
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
