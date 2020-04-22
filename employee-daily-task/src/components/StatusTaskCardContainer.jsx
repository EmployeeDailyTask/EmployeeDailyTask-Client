import React from 'react'
import styles from '../styles/StatusTasksPageStyle.module.css'
import StatusTaskCard from './StatusTaskCard'

export default function StatusTaskCardContainer ({ date, tasks }) {
    return (
        <div className={styles.StatusTaskCardContainer}>
            {date}
            {
                tasks.map(task => {
                    return (
                        <StatusTaskCard key={task._id} task={task} />
                    )
                })
            }
        </div>
    )
}