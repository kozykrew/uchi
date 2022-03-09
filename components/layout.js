import {UchiNavbar} from './UchiNavbar.js'
import {BtnNext, BtnCancel, BtnFinish, BtnToHF} from './button.js'

import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <div>
      <UchiNavbar />
      {children}
    </div>
  )
}

export function AddHFFooter(props) {
  if (props.next) {
    return (
      <footer className={styles.footer}>
        <BtnCancel cancel={props.cancel} />
        <BtnNext next={props.next} />
      </footer>
    )
  } else if (props.finish) {
    return (
      <footer className={styles.footer}>
        <BtnCancel cancel={props.cancel} />
        <BtnFinish next={props.finish} />
      </footer>
    )
  } else if (props.toHF) {
    return (
      <footer className={styles.footer}>
        <BtnToHF next={props.toHF} />
      </footer>
    )
  }
}
