import {Step} from '../components/step.js'

import styles from './tasklist.module.css'

export function StepList(props) {
  const steps = [{title:"Water your lawn", description:"Do this a few days before feeding your lawn to ensure your soil is ready to accept lawn fertilizer."},
                  {title:"Pick a spreader", description:"Spreaders fall into two categories: broadcast and drop. Each fertilizer product has a unique spreader setting. Check the bag to make sure you’re selecting the proper setting for your spreader."},
                  {title:"Apply fertilizer", description:"Feed around the perimeter first, then fill in the middle in a pattern similar to mowing the lawn. Overlap with your path slightly with each pass."}]

  var children = steps.map(step => (
    <Step stepTitle={step.title} stepDesc={step.description} />
  ));

  return (
    <div>
      {children}
    </div>
  )
}
