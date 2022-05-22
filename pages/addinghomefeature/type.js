import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import TypeCards from '../../components/typeCards.js'
import { supabase } from '../../utils/supabaseClient'
import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'
import btnStyles from '../../components/button.module.css'

export default function Type() {
  const router = useRouter();
  const homeFeature = router.query.homeFeature
  const addHF = homeFeature;
  var displayHF;
  var addHFiconpath = "/icons/hf_"// + addHF.toLowerCase() + "_lg.svg";
  if (homeFeature !== undefined) {
    displayHF = homeFeature.charAt(0).toUpperCase() + homeFeature.slice(1);
    addHFiconpath = addHFiconpath + addHF.toLowerCase() + "_lg.svg";
  }
  async function deleteHome() {
    const user = supabase.auth.user()
    let { data } = await supabase.from('UserHome').delete().eq('userID', user.id).eq('featureName', addHF)
  }
  console.log(addHF)
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
              <AddHFHeader name={displayHF} iconpath={addHFiconpath} />
            </div>
          </div>
          <div className="pageContent">
            <div className={styles.detailsContainerDesktop}>
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src={addHFiconpath} alt={displayHF} />
                <h1>Add a {displayHF}</h1>
              </div>
            </div>
            <div className={addingStyles.prompt}>
              <h2 className="textDark">What type of {displayHF} do you have?</h2>
            </div>
            <TypeCards name={homeFeature}>
            </TypeCards>
            <div className="addhfprocessbtn-container">
              <Button className={btnStyles.cancelDesktop} onClick={() => {
                deleteHome()
                router.push("/homefeatures")
              }}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={btnStyles.addDesktop} onClick={() => router.push({
                  pathname: '/addinghomefeature/age',
                  query: {homeFeature: homeFeature},
                })}>
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
        <AddHFFooter cancel="/homefeatures" next={"/addinghomefeature/age?homeFeature=" + homeFeature}  />
      </Layout>
    </div>
  )
}
