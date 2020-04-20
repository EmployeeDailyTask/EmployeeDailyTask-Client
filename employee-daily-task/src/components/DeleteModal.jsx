import React from 'react'
import styles from '../styles/DeleteModalStyle.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    deleteTask
} from '../actions/taskAction'
import {
    closeDeleteModal
} from '../actions/modalAction'

export default function DeleteModal() {
    const taskDetails = useSelector(state => state.modalReducer.deleteModalContent)
    
    const dispatch = useDispatch()

    const handleDeleteTask = () => {
        dispatch(deleteTask(taskDetails.taskId, taskDetails.page))
    }

    return (
        <div className={styles.confirmationModal}>
            <div className={styles.dialogBox}>
                <h1 style={{ textAlign: 'center' }}>Are You Sure You Want To Delete This Task?</h1>
                <div className={styles.confirmationButtons}>
                    <button onClick={() => handleDeleteTask()} className={styles.deleteButton}>Yes</button>
                    <button onClick={() => dispatch(closeDeleteModal())} className={styles.cancelDeleteButton}>No</button>
                </div>
            </div>
        </div>
    )
}