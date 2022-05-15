import {useState, useContext} from 'react'
import AppContext from '../../AppContext.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout.js'

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

  return (
    <div>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
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
              <Button className={styles.addDesktop} onClick={() => router.push("/addinghomefeature/type")}>
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
