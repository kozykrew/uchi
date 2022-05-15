import {Step} from './step.js'

// PROPS
// steps: array of step objects
// stepsComplete: state variable - array holding complete status of all steps
// setStepsComplete: state function - sets stepsComplete state variable
// handleProgress: function handling progress bar value based on step completion
export function StepList(props) {
  var children = props.steps.map((step, i) => (
    <Step id={i} stepid={step.id} key={i} stepTitle={step.title} stepDesc={step.description} stepsComplete={props.stepsComplete} setStepsComplete={props.setStepsComplete} handleProgress={props.handleProgress} />
  ));

  return (
    <div>
      {children}
    </div>
  )
}
