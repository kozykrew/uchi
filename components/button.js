import Button from 'react-bootstrap/Button'
import Image from 'next/image'

import styles from './button.module.css'

export function BtnComplete() {
  return (
    <Button className={styles.complete} size="sm">
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
