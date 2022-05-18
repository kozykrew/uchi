import {useState} from 'react'
import { supabase } from '../utils/supabaseClient'

import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'

import styles from './step.module.css'

const user = supabase.auth.user()

// PROPS
// id: integer - id of step in step array
// stepTitle: string - title of step
// stepDesc: string - description of step
// stepsComplete: state variable - array holding complete status of all steps
// setStepsComplete: state function - sets stepsComplete state variable
// handleProgress: function handling progress bar value based on step completion
export function Step(props) {
  //console.log(props)
  const [isCompleted, setIsCompleted] = useState(props.isChecked)
  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('userSteps')
        .update({ stepsStatus: !isCompleted })
        .eq('UserID', user.id)
        .eq('id', props.stepid)
        .single()
      if (error) {
        throw new Error(error)
      }
      setIsCompleted(data.stepsStatus)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div id={props.id} className={styles.container}>
      <Form className={styles.checkbox}>
        <Form.Group controlId={props.id}>
          <Form.Check type="checkbox"
            checked={props.stepsComplete[props.id] == 1}
            // checked={isCompleted}
            onChange={(e) => { 
            e.preventDefault()
            toggle()
            var updateStepsComplete = props.stepsComplete;
            (updateStepsComplete[e.target.id] == 0) ? (updateStepsComplete[e.target.id] = 1) : (updateStepsComplete[e.target.id] = 0);
            props.setStepsComplete(updateStepsComplete);
            console.log(props.stepsComplete)
            props.handleProgress()
            
          }} aria-label={"Checkbox " + props.stepTitle} />
        </Form.Group>
      </Form>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{props.stepTitle}</Accordion.Header>
          <Accordion.Body>{props.stepDesc}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )

  // <div id={props.id} className={styles.container}>
  //   <div className="form-check">
  //     <input className="form-check-input" type="checkbox" onChange={(e) => props.handleComplete} checked={props.isChecked} />
  //   </div>
  //   <Accordion flush>
  //     <Accordion.Item eventKey="0">
  //       <Accordion.Header>{props.stepTitle}</Accordion.Header>
  //       <Accordion.Body>{props.stepDesc}</Accordion.Body>
  //     </Accordion.Item>
  //   </Accordion>
  // </div>
}
