import React from 'react'
import styles from '../styles/OverviewPageStyle.module.css'

export default function OverviewCard ({title, numOfTask}) {
    return (
        <div className={styles.OverviewCard}>
            <div className={styles.CardHeader}>
                {title}
            </div>
            <div className={styles.CardContent}>
                {numOfTask}
            </div>
        </div>
    )
}