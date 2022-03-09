import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {MainDetailsTable} from '../../components/mainDetailsTable.js'


import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

export default function Confirmation() {
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
        <div className={styles.chocolate60filler}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name="Refrigerator" />
            </div>
          </div>
          <div className="pageContent">
            <div className={addingStyles.prompt}>
              <h2 className="textDark"><span className="brand">UCHI</span> is almost ready to create your custom Maintenance Guide.</h2>
            </div>
            <div>
              <p className="smallHeader textDark">Here's what you've shared with <span className="brand">UCHI</span> so far:</p>
              <div className={addingStyles.confirmationContainer}>
                <MainDetailsTable type="confirmation" />
              </div>
              <Form>
                <p className="smallHeader textDark">Tell <span className="brand">UCHI</span> additional information (optional):</p>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Brand</Form.Label>
                  <Form.Select className={addingStyles.form} aria-label="Select brand" onChange={handleSelect}>
                    <option value={null}>Select a brand</option>
                  </Form.Select>
                </div>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Model #</Form.Label>
                  <Form.Control className={addingStyles.form} type="text" placeholder="Enter model #" />
                </div>
              </Form>
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
