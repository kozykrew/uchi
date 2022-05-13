import {useState} from 'react'
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

  // HF select state for old dropdown
  // const [selectedHF, setSelectedHF] = useState(null);
  //
  // const handleSelect = (e) => setSelectedHF(e.target.value);

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

          setSelectedRoofBrand(eventKey);
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
        <Button className={styles.btnAdd} onClick={() => router.push('/addinghomefeature/type')}>
        <div className="iconRegular iconFirst">
          <IconCircleAdd_Bold_Dark />
        </div>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )

  // return (
  //   <Modal
  //     show={props.show}
  //     onHide={props.handleClose}
  //     backdrop="static"
  //     keyboard={false}
  //     centered>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Add a Home Feature</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <p>What Home Feature would you like to add to your {props.headertext} Space?</p>
  //       <Form.Select aria-label="Select home feature" onChange={handleSelect}>
  //         <option value={null}>Select a Home Feature</option>
  //         {options}
  //       </Form.Select>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button className={styles.btnCancel} onClick={props.handleClose}>
  //         <div className="iconRegular iconFirst">
  //           <IconCircleClose_Line_Dark />
  //         </div>
  //         Cancel
  //       </Button>
  //       <Button className={styles.btnAdd} onClick={() => router.push('/addinghomefeature/type')}>
  //       <div className="iconRegular iconFirst">
  //         <IconCircleAdd_Bold_Dark />
  //       </div>
  //         Add
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // )
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

  // var options = [];
  // for (let i = 0; i < hfList.length; i++) {
  //   options.push(<option value={hfList[i].replace(/\s+/g, '-').toLowerCase()}>{hfList[i]}</option>)
  // }
  // return options;

  return hfList;
}
