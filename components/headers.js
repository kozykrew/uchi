import Image from 'next/image'
import styles from './headers.module.css'

export function PageHeader(props) {
  return (
    <div className={styles.header}>
      <Image src={props.iconpath} width={45} height={45} />
      <h1 className={styles.pageHeader}>{props.headertext}</h1>
    </div>
  )
}

export function SectionHeader(props) {
  return (
    <div className={styles.header}>
      <Image src={props.iconpath} width={32} height={32} />
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
    </div>
  )
}
