import styles from './homefeature.module.css'

import Image from 'next/image'

export function HomeFeatureCard(props) {
  return(
    <div className={styles.container}>
      <div className={styles.card}>
        <Image src={props.iconpath} width={65} height={65} />
      </div>
      <p className="smallHeader">{props.hfName}</p>
    </div>
  )
}
