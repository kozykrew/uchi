import { useRouter } from "next/router";

import {UchiNavbar} from './uchiNavbar.js'
import {BtnNext, BtnCancel, BtnFinish, BtnToHF} from './button.js'
import {UchiSideNavbar} from './uchiNavbar.js'

import styles from './layout.module.css'

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div>
      <div className={styles.displayTop}>
        <UchiNavbar />
      </div>
      <div className={styles.desktopContainer}>
        <div className={styles.displaySide}>
          <UchiSideNavbar />
        </div>
        <div className={router.pathname == "/dashboard" ? "dashboard-desktop": "vanilla-bg"}>
          {children}
        </div>
      </div>
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
