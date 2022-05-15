import {SpaceHeader} from './headers.js'
import {HomeFeatureList} from './homeFeatureList.js'

// PROPS
// name: string - name of space
// hfs: array of home features
export function Space(props) {
  return (
    <div>
      <SpaceHeader headertext={props.name} />
      <HomeFeatureList space={props.name} hfs={props.hfs} />
    </div>
  )
}
