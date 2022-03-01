import Image from 'next/image'
import styles from './headers.module.css'

export function PageHeader(props) {
  return (
    <div className={styles.header}>
      <div className="iconFirst iconSelected">
        <Image src={props.iconpath} width={45} height={45} />
      </div>
      <h1 className={styles.pageHeader}>{props.headertext}</h1>
    </div>
  )
}

export function SectionHeader(props) {
  return (
    <div className={styles.header}>
    <div className="iconFirst iconRegular">
      <Image src={props.iconpath} width={32} height={32} />
    </div>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
    </div>
  )
}

export function SpaceHeader(props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
      <div className="iconLast iconRegular">
        <Image src="/../public/icons/add.png" width={32} height={32} />
      </div>
    </div>
  )
}
