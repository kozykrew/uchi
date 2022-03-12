import {Step} from './step.js'

// PROPS
// steps: array of step objects
// handleComplete: function handling check state of steps
// isChecked: state of checkboxes
export function StepList(props) {
  var children = props.steps.map((step, i) => (
    <Step key={i} stepTitle={step.title} stepDesc={step.description} handleComplete={props.handleComplete} isChecked={props.isChecked} />
  ));

  return (
    <div>
      {children}
    </div>
  )
}
