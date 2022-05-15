import Accordion from 'react-bootstrap/Accordion'
import styles from './step.module.css'
import {useState} from 'react'
import { supabase } from '../utils/supabaseClient'
// PROPS
// handleComplete: function handling check state of steps
// isChecked: state of checkboxes
const user = supabase.auth.user()
export function Step(props) {
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
    <div className={styles.container}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" onChange={(e) => {e.preventDefault()
        toggle()}} checked={isCompleted} />
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
