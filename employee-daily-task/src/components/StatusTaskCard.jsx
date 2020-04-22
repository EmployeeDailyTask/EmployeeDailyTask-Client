import React from 'react'
import styles from '../styles/StatusTasksPageStyle.module.css'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import {
    toggleManagerModal,
    openDeleteModal
} from '../actions/modalAction'
import {
    finishTask
} from '../actions/taskAction'

export default function StatusTaskCard ({ task }) {
    const { path } = useRouteMatch()
    const dispatch = useDispatch()

    const taskModalHandle = taskInfo => {
        dispatch(toggleManagerModal(taskInfo))
    }

    const handleFinishTask = taskId => {
        dispatch(finishTask(taskId))
    }
    
    const toggleConfirmationModal = () => {
        dispatch(openDeleteModal(task._id, 'manager'))
    }

    return (
        <div className={styles.StatusTaskCard}>
            <div className={styles.StatusTaskTitle}>
                {task.title}
                {
                    path === '/xcidic/manager'
                    && <>
                    <br />
                    <br />
                    Owner : {`${task.owner.firstName} ${task.owner.lastName}`}
                    </>
                }
            </div>
            {
                path === '/xcidic/manager'
                ? <>
                    <div className={styles.TaskManagerDescription}>{task.description}</div>
                    <div className={styles.TaskCardButtons}>
                        <button className={styles.ManagerEditButton} onClick={() => taskModalHandle(task)}>edit</button>
                        <button onClick={() => toggleConfirmationModal()} className={styles.ManagerDeleteButton}>Delete</button>
                        {
                            task.status === 'Submitted'
                            ? <button onClick={() => handleFinishTask(task._id)} className={styles.ManagerFinishButton}>set to finish</button>
                            : <>Status: {task.status}</>
                        }
                    </div>
                    </>
                : <div className={styles.StatusTaskDescription}>{task.description}</div>
            }
        </div>
    )
}