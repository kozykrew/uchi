import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
  // HF select state
  const [selectedHF, setSelectedHF] = useState(null);

  const handleSelect = (e) => setSelectedHF(e.target.value);

  var options = getOptions(props.headertext);

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
        <Form.Select aria-label="Select home feature" onChange={handleSelect}>
          <option value={null}>Select a Home Feature</option>
          {options}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary">Add</Button>
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

  var options = [];
  for (let i = 0; i < hfList.length; i++) {
    options.push(<option value={hfList[i].replace(/\s+/g, '-').toLowerCase()}>{hfList[i]}</option>)
  }
  return options;
}
