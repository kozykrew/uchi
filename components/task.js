import { useState, useContext, useEffect } from "react"
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {Pill} from './pill.js'
import {IconCarrot_Right_Dark} from './icons.js'

import styles from './task.module.css'


export function Task(props) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(props.taskStatus)
  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from('userTasks')
        .update({ taskStatus: !isCompleted })
        .eq('id', props.taskid)
        .single()
      if (error) {
        throw new Error(error)
      }
      setIsCompleted(data.taskStatus)
    } catch (error) {
      console.log('error', error)
    }
  }

  const value = useContext(AppContext);

  var containerClass;
  if (router.pathname == "/dashboard") {
    return (
      <div className={styles.container}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" onChange={(e) => {e.preventDefault()
            toggle()}} checked={isCompleted} id="flexCheckDefault" />
        </div>
        <div className={styles.taskDetailsContainerDashboard} taskID={props.taskID} onClick={() => {
          e.preventDefault(),
          router.push({
            pathname: '/taskdetails',
            query: {taskid: props.taskid}, 
          })
          console.log(props.taskID)
          value.setViewingTaskID(props.taskID)
        }}>
          <div>
            <h3>{props.taskTitle}</h3>
            <div className={styles.pillContainer}>
              <Pill tag={props.taskDifficulty} />
              <Pill tag={props.taskTime} />
              <Pill tag={props.taskTag3} />
            </div>
            <p>{props.taskDesc}</p>
          </div>
          <div className={styles.display}>
            <IconCarrot_Right_Dark />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" onChange={(e) => {e.preventDefault()
            toggle()}} checked={isCompleted} id="flexCheckDefault" />
        </div>
        <div className={styles.taskDetailsContainer} taskID={props.taskID} onClick={() => {
          e.preventDefault(),
          router.push({
            pathname: '/taskdetails',
            query: {taskid: props.taskid}, 
          })
          console.log(props.taskID)
          value.setViewingTaskID(props.taskID)
        }}>
          <div>
            <h3>{props.taskTitle}</h3>
            <div className={styles.pillContainer}>
              <Pill tag={props.taskDifficulty} />
              <Pill tag={props.taskTime} />
              <Pill tag={props.taskTag3} />
            </div>
            <p>{props.taskDesc}</p>
          </div>
          <div className={styles.display}>
            <IconCarrot_Right_Dark />
          </div>
        </div>
      </div>
    )
  }
}
