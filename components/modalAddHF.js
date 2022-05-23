import {useState} from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import {IconCircleClose_Line_Dark, IconCircleAdd_Bold_Dark} from './icons.js'

import styles from './modalAddHF.module.css'

// home features by space
const kitchenHFs = ["Dishwasher", "Garbage Disposal", "Microwave", "Range", "Range hood", "Refrigerator"];
const systemHFs = ["CO detectors", "Fireplace", "Ventilation", "Smoke detectors"];
const exteriorHFs = ["Gutters", "Roof", "Windows"];
const bathroomHFs = ["Bath/shower surround", "Toilet"];
const surfaceHFs = ["Carpet flooring", "Hardwood flooring"];

// PROPS
// show: STATE (modal)
// handleClose: STATE handler (modal)
// headertext: string - corresponding Space name
export function ModalAddHF(props) {
  const router = useRouter();

  var options = getOptions(props.headertext);

  // new dropdown (captured by screen recorder)
  const hfOptions = options.map((hf) => {
    var obj = {
      code: hf.replace(/\s+/g, '').toLowerCase(),
      hf: hf
    };
    return obj;
  });

  const [hfs] = useState(hfOptions);
  const [toggleContents, setToggleContents] = useState("Select a Home Feature");
  const [selectedHF, setSelectedHF] = useState();

  var hfDropdown = (
    <Form>
      <Dropdown
        onSelect={eventKey => {
          const { code, hf } = hfs.find(({ code }) => eventKey === code);

          setSelectedHF(eventKey);
          setToggleContents(<>{hf}</>);
        }}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-hfs-mobile">
          {toggleContents}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {hfs.map(({ code, hf }) => (
            <Dropdown.Item key={code} eventKey={code}>{hf}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );

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
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a Home Feature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>What Home Feature would you like to add to your {props.headertext} Space?</p>
        {hfDropdown}
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles.btnCancel} onClick={props.handleClose}>
          <div className="iconRegular iconFirst">
            <IconCircleClose_Line_Dark />
          </div>
          Cancel
        </Button>
        <Button className={styles.btnAdd} onClick={() => {
          addRow(selectedHF)
          router.push({
            pathname: '/addinghomefeature/type',
            query: { homeFeature: selectedHF},
          })
        }} >
          <span className="iconFirst">
            <img src="../icons/plus_line_dark.svg" alt="Add Home Feature" />
          </span>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function getOptions(space) {
  var hfList = [];
  switch(space) {
    case "Kitchen":
      hfList = kitchenHFs;
      break;
    case "Exterior":
      hfList = exteriorHFs;
      break;
    case "Bathroom":
      hfList = bathroomHFs;
      break;
    case "Surfaces":
      hfList = surfaceHFs;
      break;
    case "Systems":
      hfList = systemHFs;
      break;
  }

  return hfList;
}
