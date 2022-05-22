import { useRouter } from 'next/router'
import styles from './profileCard.module.css'

// PROPS
// title: string - title of profile card
// data: string - data to display (usually a number)
// outof: string - OPTIONAL. Displayed if a data piece is finite (e.g., 1 of 8 - "of 8" is the "outof")
export function ProfileCard(props) {
  const router = useRouter();
  
  let outof;
  if (props.outof) {
    outof = (
      <p className="smallHeader">{props.outof}</p>
    );
  }

  if (props.title == "Total Tasks Completed") {
     return (
       <div className={styles.card} onClick={() => router.push('/completedtasks')}>
         <h2>{props.title}</h2>
         <p className={styles.data}>{props.data}</p>
         {outof}
       </div>
     )
  } else {
    return (
      <div className={styles.card}>
        <h2>{props.title}</h2>
        <p className={styles.data}>{props.data}</p>
        {outof}
      </div>
    )
  }
}
