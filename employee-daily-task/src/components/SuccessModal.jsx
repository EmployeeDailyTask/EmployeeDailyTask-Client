import React from 'react'
import styles from '../styles/SuccessModalStyle.module.css'
import { useSelector } from 'react-redux'

export default function SuccessModal () {
    const successMessage = useSelector(state => state.modalReducer.successMessage)
    return (
        <div className={styles.SuccessModal}>
            <div className={styles.SuccessModalContainer}>
                {successMessage}
            </div>
        </div>
    )
}