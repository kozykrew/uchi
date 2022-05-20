import {useState, useContext} from 'react'
import AppContext from '../../AppContext.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout.js'
import { supabase } from '../../utils/supabaseClient'

import styles from '../../components/button.module.css'

// NOTE: This page is only used on the Desktop version.
//       This page is replaced by the Add HF Modal on mobile.
export default function SelectHomeFeature() {
  const contextValue = useContext(AppContext);
  const router = useRouter();

  const iconsHFs = contextValue.state.hfs.map((hf) => {
    var src = "../icons/hf_" + hf.replace(/\s+/g, '').toLowerCase() +"_lg.svg";
    var obj = {
      code: hf.replace(/\s+/g, '').toLowerCase(),
      src: src,
      hf: hf
    };
    return obj;
  });
  console.log(iconsHFs)

  // dropdown reference: https://stackblitz.com/edit/react-bootstrap-flags-dropdown-menu
  const [homeFeatures] = useState(iconsHFs);
  const [toggleContents, setToggleContents] = useState("Select a Home Feature");
  const [selectedHF, setSelectedHF] = useState();

  async function addRow(name) {
    try {
      const user = supabase.auth.user()

      let {data: fID} = await supabase.from('HomeFeatures').select('*').eq('featureName', name).single()
      if(fID.length == 0) {
        alert('Feature does not exist')
        router.push('/homefeatures')
      }
      console.log(data)
      const updates = {
        userID: user.id,
        featureID: fID.id,
        tag3: fID.tag3,
        featureName: fID.featureName,
        featureType: fID.featureType
      }
      let {data} = await supabase.from('UserHome').select('*').eq('featureID', fID.id).eq('userID', user.id)

      if (data.length == 0) {
        let { error } = await supabase.from('UserHome').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        })
        if (error) {
          throw error
        }
      } else {
        alert('Cannot have more than 1 Home Feature of the same type')
        router.push('/homefeatures')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => {
            router.back()
          }} />
          <h1>Add a Home Feature</h1>
          <div className="selecthf-container">
            <p className="callout">What Home Feature would you like to add to your {contextValue.state.space} Space?</p>
            <Form>
              <Dropdown
                onSelect={eventKey => {
                  const { code, src, hf } = homeFeatures.find(({ code }) => eventKey === code);
                  setSelectedHF(eventKey);
                  setToggleContents(<><img src={src} alt={hf} />{hf}</>);
                }}
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-hfs">
                  {toggleContents}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {homeFeatures.map(({ code, src, hf }) => (
                    <Dropdown.Item key={code} eventKey={code} src={src}>
                      <img src={src} alt={hf} />{hf}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
            <div className="addhfbtn-container">
              <Button className={styles.cancelDesktop} onClick={() => router.push("/homefeatures")}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={styles.addDesktop} onClick={() => {
                addRow(selectedHF)
                router.push({
                  pathname: '/addinghomefeature/type',
                  query: {homeFeature: selectedHF},
                })
              }
                }>
                <span className="iconFirst">
                  <img src="../icons/plus_line_dark.svg" alt="Add Home Feature" />
                </span>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
