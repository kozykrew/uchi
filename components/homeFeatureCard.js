import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from './homeFeatureCard.module.css'

export function HomeFeatureCard(props) {
  const router = useRouter();

  return(
    <div className={styles.container} onClick={() => router.push('/homefeaturedetails')}>
      <div className={styles.card}>
        <Image src={props.iconpath} width={65} height={65} />
      </div>
      <p className="smallHeader">{props.hfName}</p>
    </div>
  )
}
