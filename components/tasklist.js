import Link from 'next/link'
import {Task} from '../components/task.js'

import styles from './tasklist.module.css'

export function TaskList(props) {
  const tasks = [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                  {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                  {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                  {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                  {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                  {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}]

  var children = tasks.map(task => (
    <Task taskTitle={task.title} taskDifficulty={task.difficulty} taskDesc={task.description} />
  ));

  if (props.dashboard == true) {
    return (
      <div className={styles.container}>
        {children[0]}
        {children[1]}
        {children[2]}

        <Link href="/tasks">
          <a className={styles.labelAddtional}>+ {children.length - 3} more</a>
        </Link>
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
