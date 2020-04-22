import React, { useEffect, useState } from 'react'
import styles from '../styles/StatusTasksPageStyle.module.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStatusTasks } from '../actions/taskAction'
import StatusTaskCardContainer from '../components/StatusTaskCardContainer'

export default function StatusTasksPage () {
    const params = useParams().status
    const tasks = useSelector(state => state.taskReducer.statusTasks).sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    const [dates, setDates] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStatusTasks(params))
    }, [params, dispatch])

    useEffect(() => {
        for (let i = 0; i < tasks.length; i++) {
            if(!dates.includes(new Date(tasks[i].createdAt).toDateString())) {
                setDates([...dates, new Date(tasks[i].createdAt).toDateString()])
            }
        }
    }, [dates, tasks])

    return (
        <div className={styles.StatusTasksPage}>
            <h1>{params}</h1>
            <div className={styles.TasksListContainer}>
                {
                    dates.map(date => {
                        return (
                            <StatusTaskCardContainer
                            date={date}
                            key={date}
                            tasks={tasks.filter(task => new Date(task.createdAt).toDateString() === date )} />
                        )
                    })
                }
            </div>
        </div>
    )
}