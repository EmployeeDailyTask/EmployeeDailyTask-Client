import React from 'react'
import styles from '../styles/HRModalStyle.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerEmployee } from '../actions/employeeAction'
import { closeRegisterModal } from '../actions/modalAction'

export default function RegisterModal () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [division, setDivision] = useState('')
    const [level, setLevel] = useState('')
    const [divisionError, setDivisionError] = useState(false)
    const [levelError, setLevelError] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const dispatch = useDispatch()

    const handleFirstName = e => {
        setFirstName(e.target.value)
    }

    const handleLastName = e => {
        setLastName(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleDivision = e => {
        setDivision(e.target.value)
    }

    const handleLevel = e => {
        setLevel(e.target.value)
    }

    const handleNext = e => {
        e.preventDefault()
        if (!division) {
            setDivisionError(true)
        }
        if (!level) {
            setLevelError(true)
        }
        if(level && division) {
            setDivisionError(false)
            setLevelError(false)
            setConfirmation(true)
        }
    }

    const handleCancelConfirm = e => {
        e.preventDefault()
        setConfirmation(false)
    }

    const handleRegister = e => {
        e.preventDefault()
        dispatch(registerEmployee({
            firstName,
            lastName,
            email,
            division,
            level
        }))
    }

    const handleCloseModal = e => {
        if(e) {
            e.preventDefault()
        }
        dispatch(closeRegisterModal())
    }

    return (
        <div className={styles.RegisterModal}>
            <div className={styles.RegisterModalContainer}>
                <div className={styles.RegisterModalTitle}>
                    <div></div>
                    <div>Employee Registration</div>
                    <div onClick={() => handleCloseModal()} style={{fontSize: '3vh', alignSelf: 'flex-start', marginRight: '5px', cursor: 'pointer'}}>X</div>
                </div>
                {
                    confirmation
                    && <div style={{marginTop: '10px', fontWeight: 'bold'}}>Please make sure the data are all correct</div>
                }
                <form className={styles.registrationForm}>
                    <div className={styles.GroupInput}>
                        <label className={styles.RegistrationLabel} htmlFor="FirstName">First Name:</label>
                        {
                            confirmation
                            ? <div className={styles.ConfirmationBox}>{firstName}</div>
                            : <input onChange={e => handleFirstName(e)} value={firstName} className={styles.RegistrationInput} type="text"/>
                        }
                    </div>
                    <div className={styles.GroupInput}>
                        <label className={styles.RegistrationLabel} htmlFor="LastName">Last Name:</label>
                        {
                            confirmation
                            ? <div className={styles.ConfirmationBox}>{lastName}</div>
                            : <input onChange={e => handleLastName(e)} value={lastName} required className={styles.RegistrationInput} type="text"/>
                        }
                    </div>
                    <div className={styles.GroupInput}>
                        <label className={styles.RegistrationLabel} htmlFor="Email">Email:</label>
                        {
                            confirmation
                            ? <div className={styles.ConfirmationBox}>{email}</div>
                            : <input onChange={e => handleEmail(e)} value={email} required className={styles.RegistrationInput} type="email"/>
                        }
                    </div>
                    <div className={styles.GroupInput}>
                        <label className={styles.RegistrationLabel} htmlFor="Division">
                            Division:
                            {
                                divisionError
                                && <div className={styles.RegistrationErrorBox}>Please Fill All Fields</div>
                            }
                            </label>
                        {
                            confirmation
                            ? <div className={styles.ConfirmationBox}>{division}</div>
                            : <select onChange={e => handleDivision(e)} required className={styles.RegistrationInput}>
                                <option value={division}>{division}</option>
                                <option value="IT">IT</option>
                                <option value="Human Resources">Human Resources</option>
                            </select>   
                        }
                    </div>
                    <div className={styles.GroupInput}>
                        <label className={styles.RegistrationLabel} htmlFor="Level">
                            Level:
                            {
                                levelError
                                && <div className={styles.RegistrationErrorBox}>Please Fill All Fields</div>
                            }
                            </label>
                        {
                            confirmation
                            ? <div className={styles.ConfirmationBox}>{level}</div>
                            : <select onChange={e => handleLevel(e)} required className={styles.RegistrationInput}>
                                <option value={level}>{level}</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                            </select>    
                        }
                    </div>
                    {
                        confirmation
                        ? <div className={styles.NextButtonContainer}>
                            <button onClick={e => handleCancelConfirm(e)} className={styles.CancelButton}>Cancel</button>
                            <button onClick={e => handleRegister(e)} className={styles.NextButton}>Register</button>
                            </div>
                        : <div className={styles.NextButtonContainer}>
                                <button onClick={e => handleCloseModal(e)} className={styles.CancelButton}>Cancel</button>
                                <button onClick={e => handleNext(e)} className={styles.NextButton}>Next</button>
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}