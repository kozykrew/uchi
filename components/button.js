import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {IconFlag, IconHFRefrigerator_DT} from './icons.js'

import styles from './button.module.css'

// PROPS
// handleComplete: function setting progress bar value (STATE)
export function BtnComplete(props) {
  return (
    <Button className={styles.complete} size="sm" onClick={props.handleComplete}>
      <span className="iconFirst iconRegular">
        <Image src="/../public/icons/checkbox_checked_dark.png" layout="fixed" width={32} height={32} />
      </span>
      Complete
    </Button>
  )
}

export function BtnPostpone() {
  return (
    <Button className={styles.postpone} size="sm">
      <span className="iconFirst iconRegular">
        <Image src="/../public/icons/clock_line_dark.png" layout="fixed" width={32} height={32} />
      </span>
      Postpone
    </Button>
  )
}

export function BtnDelete() {
  return (
    <Button className={styles.delete} size="sm">
      <span className="iconFirst iconRegular">
        <Image src="/../public/icons/trash_line_dark.png" layout="fixed" width={32} height={32} />
      </span>
      Delete
    </Button>
  )
}

export function BtnCancel(props) {
  const router = useRouter();
  return (
    <Button className={styles.cancel} onClick={() => router.push(props.cancel)}>
      <span className="iconFirst iconRegular">
        <Image src="/../public/icons/circleclose_bold_dark.png" layout="fixed" width={32} height={32} />
      </span>
      Cancel
    </Button>
  )
}

export function BtnNext(props) {
  const router = useRouter();
  return (
    <Button className={styles.next} onClick={() => router.push(props.next)}>
      <span className="iconFirst iconRegular">
        <Image src="/../public/icons/circlearrow_right_bold_light.png" layout="fixed" width={32} height={32} />
      </span>
      Next
    </Button>
  )
}

export function BtnFinish(props) {
  const router = useRouter();
  return (
    <Button className={styles.next} onClick={() => router.push(props.next)}>
      <span className="iconFirst iconRegular">
        <IconFlag />
      </span>
      Finish
    </Button>
  )
}

export function BtnToHF(props) {
  const router = useRouter();
  return (
    <Button className={styles.toHF} onClick={() => router.push(props.next)}>
      <span className="iconFirst iconRegular">
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
