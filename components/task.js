import { useState, useContext, useEffect } from "react"
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {Pill} from './pill.js'
import {IconCarrot_Right_Dark} from './icons.js'

import styles from './task.module.css'


export function Task(props) {
  const user = supabase.auth.user()
  const value = useContext(AppContext);
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(props.taskStatus)
  const [steps, setSteps] = useState([])

  useEffect(() => {
    fetchSteps()
  }, [])

  const steps1 = []
  const fetchSteps = async () => {
  let { data: steps} = await supabase.from('userSteps').select(`*`)
  .eq('UserID', user.id)
  .eq('userTasksID', props.taskid)
  .order('title')
  steps1.push(steps)
  steps1.push([{title:"Interview contractors", description:"Ask key questions to determine their reliability.", stepsStatus: false}])
  setSteps(steps1)
  }

  const toggleSteps = async () => {
    for (var i = 0; i < steps[0].length; i++) {
      const stepsIsCompleted = steps[0][i].stepsStatus
      console.log(steps)
      const { data, error } = await supabase
      .from('userSteps')
      .update({ stepsStatus: !stepsIsCompleted})
      .eq('UserID', user.id)
      .eq('id', steps[0][i].id)
    }
  }

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
    toggleSteps()
  }

  var containerClass;
  if (router.pathname == "/dashboard") {
    return (
      <div className={styles.container}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" onChange={(e) => {e.preventDefault()
            toggle()}} checked={isCompleted} id="flexCheckDefault" />
        </div>
        <div className={styles.taskDetailsContainerDashboard} taskID={props.taskID} onClick={(e) => {
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
        <div className={styles.taskDetailsContainer} taskID={props.taskID} onClick={(e) => {
          e.preventDefault(),
          router.push({
            pathname: '/taskdetails',
            query: {taskid: props.taskid},
          })
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
