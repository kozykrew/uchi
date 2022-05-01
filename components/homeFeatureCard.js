import { useRouter } from 'next/router'
import Image from 'next/image'
import {ModalAddHF} from './modalAddHF.js'

import styles from './homeFeatureCard.module.css'

export function HomeFeatureCard(props) {
  const router = useRouter();

  //var iconFunction = "IconHF" + props.hfName.replace(/\s+/g, '') +"_lg";

  //var icon = icons[iconFunction]();
  // var icon = icons.IconHFMicrowave();
  var src = "./icons/hf_" + props.hfName.replace(/\s+/g, '').toLowerCase() +"_lg.svg";
  if (props.hfName == "Add a Feature") {
    return(
      <div className={styles.containerAdd} onClick={() => router.push('/homefeaturedetails')}>
        <div className={styles.card}>
          <img className="hfcard-icon" src="./icons/plus_line.svg" alt="My Happy SVG" />
        </div>
        <p className="smallHeader">{props.hfName}</p>
      </div>
    )
  } else {
    var icon = (<img className="hfcard-icon" src={src} alt="My Happy SVG" />)

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
