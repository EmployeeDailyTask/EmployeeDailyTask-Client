import React, { useState } from 'react'
import styles from '../styles/ChangePasswordModalStyle.module.css'
import { useDispatch } from 'react-redux'
import {
    toggleChangePassModal
} from '../actions/modalAction'
import {
    changePassword
} from '../actions/userAction'

export default function ChangePasswordModal () {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disableButton, setDisableButton] = useState(true)

    const dispatch = useDispatch()

    const handleChangeModal = () => {
        dispatch(toggleChangePassModal())
    }

    const handleOldPass = e => {
        setOldPassword(e.target.value)
    }

    const handleChangePassword = e => {
        e.preventDefault()
        dispatch(changePassword(oldPassword, newPassword))
    }

    const handleNewPass = e => {
        const newPass = e.target.value
        if(!newPass || !confirmPassword) {
            setDisableButton(true)
        } else if (newPass !== confirmPassword) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
        setNewPassword(newPass)
    }

    const handleConfirmPass = e => {
        const confirmPass = e.target.value
        if(!confirmPass || !newPassword) {
            setDisableButton(true)
        } else if (confirmPass !== newPassword) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
        setConfirmPassword(confirmPass)
    }

    return (
        <div className={styles.ChangePasswordModal}>
            <div className={styles.ChangePasswordContainer}>
                <div className={styles.ChangePassTitle}>
                    <div></div>
                    <div>Change Password</div>
                    <div onClick={() => handleChangeModal()} style={{alignSelf: 'start', cursor: 'pointer'}}>X</div>
                </div>
                <form onSubmit={e => handleChangePassword(e)} className={styles.ChangePassForm}>
                    <label className={styles.ChangePassLabel}>Old Password</label>
                    <input onChange={e => handleOldPass(e)} value={oldPassword} className={styles.ChangePassInput} type="password"/>
                    <label className={styles.ChangePassLabel}>New Password</label>
                    <input onChange={e => handleNewPass(e)} value={newPassword} className={styles.ChangePassInput} type="password"/>
                    <label className={styles.ChangePassLabel}>Re-ented New Password</label>
                    <input onChange={e => handleConfirmPass(e)} value={confirmPassword} className={styles.ChangePassInput} type="password"/>
                    <button type="submit" disabled={disableButton} className={styles.ChangePassButton}>Submit</button>
                </form>
            </div>
        </div>
    )
}