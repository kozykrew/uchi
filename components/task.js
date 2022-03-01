import Image from 'next/image'
import styles from './task.module.css'

export function Task(props) {
  return (
    <div className={styles.container}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      </div>
      <div className={styles.taskDetailsContainer}>
        <div>
          <h3>{props.taskTitle}</h3>
          <p>{props.taskDesc}</p>
        </div>
        <p className="smallHeader tag">{props.taskDifficulty}</p>
        <Image src="/../public/icons/carrot_right.png" width={32} height={32} />
      </div>
    </div>
  )
}
