import {Task} from './task.js'

import styles from './taskList.module.css'

// PROPS
// dashboard: boolean - location of the TaskList
// tasks: array of task objects
export function TaskList(props) {
  var children = props.tasks.map((task, i) => (
    <Task key={i} taskID={i} taskTitle={task.title} taskDifficulty={task.difficulty} taskDesc={task.description} />
  ));

  if (props.dashboard == true) {
    return (
      <div className={styles.container}>
        {children[0]}
        {children[1]}
        {children[2]}
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        {children}
      </div>
    )
  }
}
