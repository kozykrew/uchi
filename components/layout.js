import {UchiNavbar} from './UchiNavbar.js'
import {BtnNext, BtnCancel} from './button.js'

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
  const next = '/' + props.next;
  return (
    <footer className={styles.footer}>
      <BtnCancel cancel={props.cancel} />
      <BtnNext next={props.next} />
    </footer>
  )
}
