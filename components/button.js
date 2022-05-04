import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {IconCheckbox_Dark, IconClock_Line_Dark, IconTrash_Line_Dark, IconCircleClose_Bold_Dark, IconCircleArrow_Right_Bold_Dark, IconFlag_Bold_Dark, IconHFRefrigerator_DT} from './icons.js'

import styles from './button.module.css'

// PROPS
// handleComplete: function setting progress bar value (STATE)
export function BtnComplete(props) {
  return (
    <Button className={styles.complete} size="sm" onClick={props.handleComplete}>
      <img src="./icons/check_line_dark.svg" alt="Complete" />
      Complete
    </Button>
  )
}

export function BtnPostpone() {
  return (
    <Button className={styles.postpone} size="sm">
      <img src="./icons/clock_line_dark.svg" alt="Postpone" />
      Postpone
    </Button>
  )
}

export function BtnDelete() {
  return (
    <Button className={styles.delete} size="sm">
      <img src="./icons/trash_line_dark.svg" alt="Delete" />
      Delete
    </Button>
  )
}

export function BtnCancel(props) {
  const router = useRouter();
  return (
    <Button className={styles.cancel} onClick={() => router.push(props.cancel)}>
      <span className="iconFirst">
        <IconCircleClose_Bold_Dark />
      </span>
      Cancel
    </Button>
  )
}

export function BtnNext(props) {
  const router = useRouter();
  return (
    <Button className={styles.next} onClick={() => router.push(props.next)}>
      <span className="iconFirst">
        <IconCircleArrow_Right_Bold_Dark />
      </span>
      Next
    </Button>
  )
}

export function BtnFinish(props) {
  const router = useRouter();
  return (
    <Button className={styles.next} onClick={() => router.push(props.next)}>
      <span className="iconFirst">
        <IconFlag_Bold_Dark />
      </span>
      Finish
    </Button>
  )
}

export function BtnToHF(props) {
  const router = useRouter();
  return (
    <Button className={styles.toHF} onClick={() => router.push(props.next)}>
      <span className="iconFirst">
        <IconHFRefrigerator_DT />
      </span>
      See my Refrigerator
    </Button>
  )
}

export function BtnTool(props) {
  return (
    <Button className={styles.tool}>
      {props.name}
    </Button>
  )
}
