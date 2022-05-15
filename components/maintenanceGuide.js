// DEPRECATED.
// As of Desktop Version user testing (SP22), it was realized that maintenance guide tasks
// would be better recognizable as tasks if they followed the convention of how tasks appear
// in other places on UCHI. Thus, the unique styling defined by maintenanceGuide.js,
// maintenanceGuidePiece.js, and maintenanceGuidePiece.module.css are unnecessary.

import {MaintenanceGuidePiece} from './maintenanceGuidePiece.js'

import styles from './taskList.module.css'

// PROPS
// tasks: array of task objects
export function MaintenanceGuide(props) {
  var children = props.tasks.map((task, i) => (
    <MaintenanceGuidePiece key={i} title={task.title} difficulty={task.difficulty} frequency={task.frequency} />
  ));

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
