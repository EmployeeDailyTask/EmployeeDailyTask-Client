import React, { useState, useEffect } from 'react'
import styles from '../styles/TaskModal.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    closeTaskModal
} from '../actions/modalAction'
import {
    createTask,
    editTask
} from '../actions/taskAction'

export default function TaskModal () {
    const task = useSelector(state => state.modalReducer.taskCardModalContent)
    const modalType = useSelector(state => state.modalReducer.taskCardModal)
    
    const [editForm, setEditForm] = useState(false)
    const [titleInput, setTitleInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [statusInput, setStatusInput] = useState('-')

    const dispatch = useDispatch()

    useEffect(() => {
        if (modalType === 'manager') {
            setEditForm(true)
            setTitleInput(task.title)
            setDescriptionInput(task.description)
            setStatusInput(task.status)
        }
    }, [modalType, task])

    const handleTitleInput = e => {
        setTitleInput(e.target.value)
    }

    const handleDescriptionInput = e => {
        setDescriptionInput(e.target.value)
    }

    const closeModalHandle = () => {
        setTitleInput('')
        setDescriptionInput('')
        setStatusInput('-')
        dispatch(closeTaskModal())
    }

    const submitTask = e => {
        e.preventDefault()
        const taskDetails = {
            title: titleInput,
            description: descriptionInput
        }
        if (editForm) {
            let payload
            if(modalType === 'manager') {
                payload = {
                    ...taskDetails,
                    taskId: task._id,
                    page: 'manager'
                }
            } else {
                payload = {
                    ...taskDetails,
                    taskId: task._id,
                    page: 'employee'
                }
            }
            dispatch(editTask(payload))
        } else {
            dispatch(createTask(taskDetails))
        }
        setTitleInput('')
        setDescriptionInput('')
        setStatusInput('-')
        dispatch(closeTaskModal())
    }

    const cancelFormHandle = e => {
        e.preventDefault()
        if(modalType === 'details') {
            setEditForm(false)
        } else if (modalType === 'create' || modalType === 'manager') {
            dispatch(closeTaskModal())
        }
    }

    const toggleEdit = () => {
        setTitleInput(task.title)
        setDescriptionInput(task.description)
        setStatusInput(task.status)
        setEditForm(!editForm)
    }

    return (
        <div className={styles.ModalContainer}>
            <div className={styles.ModalContent}>
                <div className={styles.CloseContainer}>
                    <div></div>
                    <div
                    onClick={() => closeModalHandle()}
                    style={{cursor: 'pointer'}}
                    >X</div>
                </div>
                {
                    modalType === 'create' || editForm
                    ? <div className={styles.MainContainer}>
                        <form onSubmit={e => submitTask(e)} className={styles.TaskForm}>
                            <input
                                className={styles.CardTitle}
                                id={styles.TaskTitleInput}
                                type='text'
                                placeholder='Task Title Here'
                                value={titleInput}
                                onChange={e => handleTitleInput(e)}
                            />
                            <div className={styles.TaskStatus}>
                                <div>Status: {statusInput} </div>
                                <div>
                                </div>
                            </div>
                            <textarea
                                className={styles.TaskDescInput}
                                name="Task Description"
                                cols="30"
                                rows="7"
                                value={descriptionInput}
                                onChange={e => handleDescriptionInput(e)}
                                ></textarea>
                            <div className={styles.FormButtonContainer}>
                                {
                                    editForm
                                    ? <button type='submit' className={styles.SubmitFormButton}>Edit Task</button>
                                    : <button type='submit' className={styles.SubmitFormButton}>Add Task</button>
                                }
                                <button className={styles.CancelFormButton} onClick={e => cancelFormHandle(e)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    : <div className={styles.MainContainer}>
                        <div className={styles.CardTitle}>{task.title}</div>
                        <div className={styles.TaskDetailContainer}>
                            <div className={styles.TaskStatus}>
                                <div>Status: {task.status}</div>
                                <div className={styles.editButtonContainer}>
                                    <button className={styles.editButton} onClick={() => toggleEdit()}>Edit</button>
                                </div>
                            </div>
                            <div className={styles.TaskDescription}>
                                {task.description}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
