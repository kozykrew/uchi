import {SpaceHeader} from '../components/headers.js'
import {HomeFeatureCard} from '../components/homefeature.js'

export function Space(props) {
  return (
    <div>
      <SpaceHeader headertext={props.headertext} />
      <HomeFeatureCard iconpath="/../public/icons/hf_window.png" hfName="Windows" />
    </div>
  )
}
