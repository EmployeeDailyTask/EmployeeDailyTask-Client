import React from 'react'
import styles from '../styles/TasksPageStyle.module.css'
import { useRouteMatch } from 'react-router-dom'

export default function TasksPage () {
    const {path} = useRouteMatch()
    console.log(path)
    return (
        <div className={styles.TasksPageContainer}>
            <h1>Tasks Page</h1>
        </div>
    )
}