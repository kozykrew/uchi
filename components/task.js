import { useContext } from "react"
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {Pill} from './pill.js'
import {IconCarrot_Right_Dark} from './icons.js'

import styles from './task.module.css'

export function Task(props) {
  const router = useRouter();

  const value = useContext(AppContext);

  var containerClass;
  if (router.pathname == "/dashboard") {
    return (
      <div className={styles.container}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        </div>
        <div className={styles.taskDetailsContainerDashboard} taskID={props.taskID} onClick={() => {
          router.push('/taskdetails')
          console.log(props.taskID)
          value.setViewingTaskID(props.taskID)
        }}>
          <div>
            <h3>{props.taskTitle}</h3>
            <div className={styles.pillContainer}>
              <Pill tag={"Complex"} />
              <Pill tag={"1 hour"} />
              <Pill tag={"Exterior"} />
            </div>
            <p>{props.taskDesc}</p>
          </div>
          <div className={styles.display}>
            <IconCarrot_Right_Dark />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        </div>
        <div className={styles.taskDetailsContainer} taskID={props.taskID} onClick={() => {
          router.push('/taskdetails')
          console.log(props.taskID)
          value.setViewingTaskID(props.taskID)
        }}>
          <div>
            <h3>{props.taskTitle}</h3>
            <div className={styles.pillContainer}>
              <Pill tag={"Complex"} />
              <Pill tag={"1 hour"} />
              <Pill tag={"Exterior"} />
            </div>
            <p>{props.taskDesc}</p>
          </div>
          <div className={styles.display}>
            <IconCarrot_Right_Dark />
          </div>
        </div>
      </div>
    )
  }
}
