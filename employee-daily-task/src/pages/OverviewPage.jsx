import React from 'react'
import styles from '../styles/OverviewPageStyle.module.css'
import OverviewCard from '../components/OverviewCard'
import { useSelector } from 'react-redux'

export default function OverViewPage () {
    const activeTasks = useSelector(state => state.taskReducer.activeTasks)
    const expiredTasks = useSelector(state => state.taskReducer.expiredTasks)
    const submittedTasks = useSelector(state => state.taskReducer.submittedTasks)
    const fullName = useSelector(state => state.userReducer.fullName)
    const division = useSelector(state => state.userReducer.division)
    const level = useSelector(state => state.userReducer.level)

    return (
        <div className={styles.OverviewContainer}>
            <div className={styles.OverviewHeader}>
                <h1 className={styles.HeaderContent}>{fullName}</h1>
                <h2 className={styles.HeaderContent}>{division} Division</h2>
                <h3 className={styles.HeaderContent}>{level}</h3>
            </div>
            <div className={styles.OverViewContent}>
                <div className={styles.ContentTitle}>
                    Here are your Work Overview for Today, {new Date().toDateString()}
                </div>
                <div className={styles.ContentContainer}>
                    <OverviewCard title='Expired' numOfTask={expiredTasks.length} />
                    <OverviewCard title='Today' numOfTask={activeTasks.length} />
                    <OverviewCard title='Submitted' numOfTask={submittedTasks.length} />
                </div>
            </div>
        </div>
    )
}