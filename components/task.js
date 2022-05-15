import { useRouter } from 'next/router'
import Image from 'next/image'
import {IconCarrot_Right_Dark} from './icons.js'
import { useContext } from "react"
import styles from './task.module.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

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
  
  
  return (
    
    <div className={styles.container}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" onChange={(e) => {e.preventDefault()
        toggle()}} checked={isCompleted} id="flexCheckDefault"  />
      </div>
      <div className={styles.taskDetailsContainer} onClick={(e) => {
        e.preventDefault(),
        router.push({
          pathname: '/taskdetails',
          query: {taskid: props.taskid}, 
        })
      }}>
        <div>
          <h3>{props.taskTitle}</h3>
          <p>{props.taskDesc}</p>
        </div>
        <p className="smallHeader tag">{props.taskDifficulty}</p>
        <IconCarrot_Right_Dark />
      </div>
    </div>
  )
}
