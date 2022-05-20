import { useRouter } from "next/router";

import {UchiNavbar} from './uchiNavbar.js'
import {BtnNext, BtnCancel, BtnFinish, BtnToHF} from './button.js'
import {UchiSideNavbar} from './uchiNavbar.js'

import styles from './layout.module.css'

export default function Layout({ children }) {
  const router = useRouter();
  var desktopContainerClass = "";

  switch (router.pathname) {
    case "/dashboard":
      desktopContainerClass = "dashboard-desktop";
      break;
    case "/homefeaturedetails":
      desktopContainerClass = "desktopContainer-vanillaToasted";
      break;
    case "/profile":
      desktopContainerClass = "desktopContainer-vanillaToasted";
      break;
    case "/taskdetails":
      desktopContainerClass = "desktopContainer-chocolate80";
      break;
    case "/":
      break;
    default:
      desktopContainerClass = "desktopContainer-vanilla";
  }
  // if (router.pathname == "/dashboard") {
  //   desktopContainerClass = "dashboard-desktop";
  // } else if (router.pathname == "/homefeaturedetails" || router.pathname == "/profile") {
  //   desktopContainerClass = "desktopContainer-vanillaToasted";
  // } else if (router.pathname == "/taskdetails") {
  //   desktopContainerClass = "desktopContainer-chocolate80";
  // } else if (router.pathname == "/") {
  //   break;
  // } else {
  //   desktopContainerClass = "desktopContainer-vanilla";
  // }

  // router.pathname == "/dashboard" ? "dashboard-desktop": "vanilla-bg"

  return (
    <div>
      <div className={styles.displayTop}>
        <UchiNavbar />
      </div>
      <div className={styles.desktopContainer}>
        <div className={styles.displaySide}>
          <UchiSideNavbar />
        </div>
        <div className={desktopContainerClass}>
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

export function OnboardingLayout({ children }) {
  return (
    <div className={styles.desktopContainer}>
      <div className={styles.onboardingContainer}>
        <p className={styles.brand}>UCHI</p>
        {children}
      </div>
    </div>
  )
}
