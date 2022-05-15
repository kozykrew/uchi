import styles from './pill.module.css'

export function Pill(tag) {
  var greenTime = ["5 minutes", "5-10 minutes", "5-10 minutes / window",
                  "10 minutes", "15-20 minutes", "20-25 minutes", "20-30 minutes",
                  "30-40 minutes", "30-50 minutes", "30-45 minutes",
                  "30 minutes / room", "45 min - 1 hour", "50 min - 1 hour"];
  var yellowTime = ["1-2 hours", "2-4 hours"];
  var redTime = ["3-7 hours", "3-8 hours", "3-5 days", "Weeks"];
  var spaces = ["Bathroom", "Exterior", "Kitchen", "Outdoors", "Surfaces", "Systems", "Utilities", "Miscellaneous"];

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
  } else if (spaces.includes(tag.tag)) {
    return (
      <div className={styles.vanillaPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  } else {
    return (
      <div className={styles.toastedVanillaPill}>
        <p className="smallHeader">{tag.tag}</p>
      </div>
    )
  }
}
