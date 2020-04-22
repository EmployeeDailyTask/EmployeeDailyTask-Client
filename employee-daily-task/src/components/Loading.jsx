import React from 'react'
import styles from '../styles/LoadingStyle.module.css'
import { useSelector } from 'react-redux'

export default function Loading () {
    const message = useSelector(state => state.loadingReducer.message)
        
    return (
        <div className={styles.LoadingContainerFull}>
            <div className={styles.loadingSpinnerContainer}>
                <img className={styles.loadingSpinner} src={require('../assets/loadingSpinner.gif')} alt="Loading"/>
            </div>
            {
                message
                && <div className={styles.loadingMessageContainer}>
                        {message}
                    </div>
            }
        </div>
    )
}