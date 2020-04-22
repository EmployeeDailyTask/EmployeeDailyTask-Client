import React from 'react'
import styles from '../styles/ErrorModalStyle.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    closeErrorModal
} from '../actions/modalAction'

export default function ErrorModal () {
    const errorMessage = useSelector(state => state.errorReducer.message)
    const dispatch = useDispatch()

    return (
        <div className={styles.errorModal}>
            <div className={styles.errorModalContainer}>
                An Error has Occured. . .
                <div style={{fontSize: '2.3vh', fontWeight: 'normal'}}>Please Refresh your page</div>
                <div style={{fontSize: '1.5vh', fontWeight: 'normal'}}>If this error keep occuring, please contact your IT support team</div>
                {
                    errorMessage
                    && <div style={{fontSize: '2.3vh', marginTop: '10px', marginBottom: '10px', textAlign: 'center'}}>{errorMessage}</div>
                }
                <button onClick={() => dispatch(closeErrorModal())} className={styles.closeErrorButton}>Close</button>
            </div>
        </div>
    )
}