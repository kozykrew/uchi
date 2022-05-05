import {useContext} from 'react'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {ModalAddHF} from './modalAddHF.js'

import styles from './homeFeatureCard.module.css'

// PROPS
// space: string - name of space
// hfName: string - name of home feature
export function HomeFeatureCard(props) {
  const contextValue = useContext(AppContext);

  const router = useRouter();

  var src = "./icons/hf_" + props.hfName.replace(/\s+/g, '').toLowerCase() + "_lg.svg";
  if (props.hfName == "Add a Feature") {
    return(
      <div className={styles.containerAdd} onClick={() => {
        router.push('/addinghomefeature/select')
        contextValue.setSpaceName(props.space)
      }}>
        <div className={styles.card}>
          <img className="hfcard-icon" src="./icons/plus_line.svg" alt="Add a Home Feature" />
        </div>
        <p className="smallHeader">{props.hfName}</p>
      </div>
    )
  } else {
    var icon = (<img className="hfcard-icon" src={src} alt={props.hfName} />)

    return(
      <div className={styles.container} onClick={() => router.push('/homefeaturedetails')}>
        <div className={styles.card}>
          {icon}
        </div>
        <p className="smallHeader">{props.hfName}</p>
      </div>
    )
  }
}
