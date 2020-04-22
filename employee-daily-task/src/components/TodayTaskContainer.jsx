import React from 'react'
import TaskDetailCard from '../components/TaskDetailCard'
import styles from '../styles/TodayTaskComponentStyle.module.css'
import {
    toggleCreateModal
} from '../actions/modalAction'
import { useDispatch } from 'react-redux'

export default function TodayTaskContainer ({title, tasks}) {
    const dispatch = useDispatch()

    const openCreateModal = e => {
        e.preventDefault()
        dispatch(toggleCreateModal())
    }
    return (
        <div className={styles.TaskCardContainer}>
            {
                title === 'Active'
                ? <div className={styles.ActiveTitle}>
                    <div style={{width: '20%'}}></div>
                    <h1 style={{marginRight: 0, width: '30%'}}>{title}</h1>
                    <div className={styles.AddButtonContainer}>
                        <button className={styles.AddButton} onClick={e => openCreateModal(e)}>+</button>
                    </div>
                </div>
                : <h1>{title}</h1>
            }
            {
                tasks.map(task => {
                    return (
                        <TaskDetailCard task={task} key={task._id} />
                    )
                })
            }
        </div>
    )
}