import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {MainDetailsTable} from '../../components/mainDetailsTable.js'


import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'
import btnStyles from '../../components/button.module.css'

const additional = [{header:"Has built-in ice maker?", data:"yes"}]

export default function Confirmation() {
  const router = useRouter();

  // brand select state
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSelect = (e) => setSelectedBrand(e.target.value);

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
              <AddHFHeader name="Refrigerator" previous="/addinghomefeature/age" />
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
              <h2 className="textDark"><span className="brand">UCHI</span> is almost ready to create your custom Maintenance Guide.</h2>
            </div>
            <div className={addingStyles.confirmationContainerDesktop}>
              <p className="smallHeader textDark">Here&apos;s what you&apos;ve shared with <span className="brand">UCHI</span> so far:</p>
              <div className={addingStyles.confirmationContainer}>
                <MainDetailsTable type="confirmation" additional={additional} />
              </div>
              <Form>
                <p className="smallHeader textDark">Tell <span className="brand">UCHI</span> additional information (optional):</p>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Brand</Form.Label>
                  <Form.Select className={addingStyles.form} aria-label="Select brand" onChange={handleSelect}>
                    <option value={null}>Select a brand</option>
                    <option value="bosch">Bosch</option>
                    <option value="frigidaire">Frigidaire</option>
                    <option value="ge-appliances">GE Appliances</option>
                    <option value="insignia">Insignia</option>
                    <option value="kitchenaid">KitchenAid</option>
                    <option value="lg">LG</option>
                    <option value="maytag">Maytag</option>
                    <option value="samsung">Samsung</option>
                    <option value="whirlpool">Whirlpool</option>
                  </Form.Select>
                </div>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Model #</Form.Label>
                  <Form.Control className={addingStyles.form} type="text" placeholder="Enter model #" />
                </div>
              </Form>
            </div>
            <div className="addhfprocessbtn-container">
              <Button className={btnStyles.cancelDesktop} onClick={() => router.push("/homefeatures")}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={btnStyles.addDesktop} onClick={() => router.push("/homefeaturedetails")}>
                <span className="iconFirst">
                  <img src="../icons/flag_line_dark.svg" alt="Finish" />
                </span>
                Finish
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" finish="/addinghomefeature/maintenanceguide" />
      </Layout>
    </div>
  )
}
