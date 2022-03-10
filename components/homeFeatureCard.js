import { useRouter } from 'next/router'
import Image from 'next/image'
import * as icons from './icons.js'

import styles from './homeFeatureCard.module.css'

export function HomeFeatureCard(props) {
  const router = useRouter();

  var name = "Microwave";
  var iconFunction = "IconHF" + props.hfName.replace(/\s+/g, '') +"_lg";

  var icon = icons[iconFunction]();
  // var icon = icons.IconHFMicrowave();
  console.log(icon)

  return(
    <div className={styles.container} onClick={() => router.push('/homefeaturedetails')}>
      <div className={styles.card}>
        {icon}
      </div>
      <p className="smallHeader">{props.hfName}</p>
    </div>
  )

  // return(
  //   <div className={styles.container} onClick={() => router.push('/homefeaturedetails')}>
  //     <div className={styles.card}>
  //       <Image src={props.iconpath} width={65} height={65} />
  //     </div>
  //     <p className="smallHeader">{props.hfName}</p>
  //   </div>
  // )
}
