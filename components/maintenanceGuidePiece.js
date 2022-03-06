import { useRouter } from 'next/router'
import Image from 'next/image'
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
        <Image src="/../public/icons/arrow_right.png" width={32} height={32} />
      </div>
      <div className={styles.maintenanceGuidePieceContainer} onClick={() => router.push('/taskdetails')}>
        <div>
          <h3>{props.title}</h3>
          <div className={styles.maintenanceGuidePieceDetails}>
            <div className={styles.maintenanceGuidePieceTag}>
              <div className="iconRegular iconFirst">
                <Image src="/../public/icons/difficulty_easy.png" width={32} height={32} />
              </div>
              <p className={styles.icontag}>{props.difficulty}</p>
            </div>
            <div className={styles.maintenanceGuidePieceTag}>
              <div className="iconRegular iconFirst">
                <Image src="/../public/icons/calendar_line.png" width={32} height={32} />
              </div>
              <p className={styles.icontag}>{props.frequency}</p>
            </div>
          </div>
        </div>
        <Image src="/../public/icons/carrot_right.png" width={32} height={32} />
      </div>
    </div>
  )
}
