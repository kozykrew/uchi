import Image from 'next/image'

import styles from './typeCard.module.css'

// PROPS
// imgpath: string - path to image
// type: string - name of type
export function TypeCard(props) {
  return(
    <div className={styles.container}>
      <Image className={styles.img} src={props.imgpath} layout="responsive" width={100} height={100} />
      <div className={styles.label}>
        <p className="smallHeader">{props.type}</p>
      </div>
    </div>
  )
}
