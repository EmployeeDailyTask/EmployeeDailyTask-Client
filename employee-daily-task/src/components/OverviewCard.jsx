import React from 'react'
import styles from '../styles/OverviewPageStyle.module.css'
import { useSelector } from 'react-redux'

export default function OverviewCard ({title, numOfTask, history}) {
    const loading = useSelector(state => state.loadingReducer.loading)

    const handleStatusNavigation = () => {
        history.push(`/xcidic/tasks/${title}`)
    }
    return (
        <div onClick={() => handleStatusNavigation()} className={styles.OverviewCard}>
            <div className={styles.CardHeader}>
                {title}
            </div>
            <div className={styles.CardContent}>
                {
                    loading
                    ? <div className={styles.OverviewLoading}>
                        <img className={styles.OverviewSpinner} src={require('../assets/loadingSpinner.gif')} alt="Loading"/>
                    </div>
                    : <>{numOfTask}</>
                }
            </div>
        </div>
    )
}