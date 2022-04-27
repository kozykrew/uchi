import styles from './pill.module.css'

export function Pill(tag) {
  //TODO: get time options from dataset
  var greenTime = ["15 minutes", "30 minutes", "1 hour", "2 hours"];
  var yellowTime = ["2-4 hours"];
  var redTime = ["6 hours"]

  if (tag.tag == "Simple" || greenTime.includes(tag.tag)) {
    return (
      <div className={styles.greenPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  } else if (tag.tag == "Average" || yellowTime.includes(tag.tag)) {
    return (
      <div className={styles.yellowPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  } else if (tag.tag == "Complex" || redTime.includes(tag.tag)) {
    return (
      <div className={styles.redPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  } else {
    return (
      <div className={styles.vanillaPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  }
}
