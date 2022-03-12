import { useRouter } from 'next/router'
import Image from 'next/image'
import {IconCarrot_Right_Dark} from './icons.js'

import styles from './task.module.css'

export function Task(props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      </div>
      <div className={styles.taskDetailsContainer} onClick={() => router.push('/taskdetails')}>
        <div>
          <h3>{props.taskTitle}</h3>
          <p>{props.taskDesc}</p>
        </div>
        <p className="smallHeader tag">{props.taskDifficulty}</p>
        <IconCarrot_Right_Dark />
      </div>
    </div>
  )
}
