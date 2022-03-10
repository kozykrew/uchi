import Accordion from 'react-bootstrap/Accordion'
import styles from './step.module.css'

// PROPS
// handleComplete: function handling check state of steps
// isChecked: state of checkboxes
export function Step(props) {
  return (
    <div className={styles.container}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" onChange={(e) => props.handleComplete} checked={props.isChecked} />
      </div>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{props.stepTitle}</Accordion.Header>
          <Accordion.Body>{props.stepDesc}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
