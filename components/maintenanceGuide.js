import {MaintenanceGuidePiece} from './maintenanceGuidePiece.js'

import styles from './taskList.module.css'

// PROPS
// tasks: array of task objects
export function MaintenanceGuide(props) {
  var children = props.tasks.map((task) => (
    <MaintenanceGuidePiece title={task.title} difficulty={task.difficulty} frequency={task.frequency} />
  ));

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
