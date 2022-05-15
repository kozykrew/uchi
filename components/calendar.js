import styles from './calendar.module.css'

export function Calendar(props) {
  return (
    <div className={styles.container}>
      <MonthCard selected={true} month={props.months[0]} />
      <MonthCard selected={false} month={props.months[1]} />
      <MonthCard selected={false} month={props.months[2]} />
      <MonthCard selected={false} month={props.months[3]} />
      <MonthCard selected={false} month={props.months[4]} />
      <MonthCard selected={false} month={props.months[5]} />
    </div>
  )
}

function MonthCard(props) {
  if (props.selected == true) {
    return (
      <div className={styles.selected}>
        <h3 className={styles.monthLabel}>{props.month}</h3>
      </div>
    )
  } else {
    return (
      <div className={styles.deselected}>
        <h3 className={styles.monthLabel}>{props.month}</h3>
      </div>
    )
  }
}
