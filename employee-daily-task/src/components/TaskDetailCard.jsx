import React from 'react'
import styles from '../styles/TodayTaskComponentStyle.module.css'
import {
    openTaskModal
} from '../actions/modalAction'
import {
    submitTask
} from '../actions/taskAction'
import { useDispatch } from 'react-redux'

export default function TaskDetailCard({ task }) {
    const dispatch = useDispatch()

    const taskModalHandle = () => {
        dispatch(openTaskModal(task))
    }

    const submitTaskHandle = () => {
        dispatch(submitTask(task._id))
    }

    return (
        <div className={styles.TaskCard}>
            <div className={styles.TaskTitle}>
                {task.title}
            </div>
            <div className={styles.TaskDescription}>
                {task.description.slice(0, 75)} . . .
            </div>
            <div className={styles.TaskButtonContainer}>
                <button type='button' className={styles.TaskDetailButton} onClick={() => taskModalHandle()}>Details</button>
                {
                    task.status === 'Active'
                    && <button className={styles.TaskSubmitButton} onClick={() => submitTaskHandle()}>Submit</button>
                }
            </div>
        </div>
    )
}