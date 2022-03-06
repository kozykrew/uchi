import {Step} from '../components/step.js'

import styles from './tasklist.module.css'

// PROPS
// steps: array of step objects
export function StepList(props) {
  var children = props.steps.map(step => (
    <Step stepTitle={step.title} stepDesc={step.description} />
  ));

  return (
    <div>
      {children}
    </div>
  )
}
