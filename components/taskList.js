import {Task} from './task.js'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './taskList.module.css'

// PROPS
// dashboard: boolean - location of the TaskList
// tasks: array of task objects
export function TaskList(props) {
  const router = useRouter();

  var children = props.tasks.map((task, i) => (
    <Task key={i} taskID={i} taskid={task.id} taskTitle={task.title} taskDifficulty={task.difficulty} taskTime={task.time} taskTag3={task.tag3} taskDesc={task.description} taskStatus={task.taskStatus} steps={task.steps} />
  ));

  if (children.length == 0) {
    if (router.pathname == "/completedtasks") {
      return (
        <p className="smallHeader text-center">You have no completed Tasks!
        </p>
      )
    } else {
      return (
        <p className="smallHeader text-center">You have no Tasks to do!
        </p>
      )
    }
  }

  if (props.dashboard == true) {
    let additionalTaskLink;
    if (children.length > 3) {
      additionalTaskLink = (
        <Link key="additional" href="/tasks">
          <a className="labelAdditional">+ {children.length - 3} more</a>
        </Link>
      );
    }

    return (
        [<div key="tasklist" className={styles.container}>
          {children[0]}
          {children[1]}
          {children[2]}
        </div>,
        additionalTaskLink]
      )
  } else {
    return (
      <div className={styles.container}>
        {children}
      </div>
    )
  }
}
