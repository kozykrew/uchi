import { useRouter } from 'next/router'
import Image from 'next/image'
import {IconArrowRight_Dark, IconDifficulty_Easy, IconCalendar_Line_Light, IconCarrot_Right_Light} from './icons.js'

import styles from './maintenanceGuidePiece.module.css'

// PROPS
// title: string
// difficulty string
// frequency: string
export function MaintenanceGuidePiece(props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="iconRegular">
        <IconArrowRight_Dark />
      </div>
      <div className={styles.maintenanceGuidePieceContainer} onClick={() => router.push('/taskdetails')}>
        <div>
          <h3>{props.title}</h3>
          <div className={styles.maintenanceGuidePieceDetails}>
            <div className={styles.maintenanceGuidePieceTag}>
              <div className="iconRegular iconFirst">
                <IconDifficulty_Easy />
              </div>
              <p className={styles.icontag}>{props.difficulty}</p>
            </div>
            <div className={styles.maintenanceGuidePieceTag}>
              <div className="iconRegular iconFirst">
                <IconCalendar_Line_Light />
              </div>
              <p className={styles.icontag}>{props.frequency}</p>
            </div>
          </div>
        </div>
        <IconCarrot_Right_Light />
      </div>
    </div>
  )
}
