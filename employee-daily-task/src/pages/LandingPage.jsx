import React, { useState, useEffect } from 'react'
import styles from '../styles/LandingPageStyle.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import Loading from '../components/Loading'
import ErrorModal from '../components/ErrorModal'

export default function LandingPage ({ history }) {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const loginError = useSelector(state => state.errorReducer.loginError)
    const loggedIn = useSelector(state => state.userReducer.fullName)
    const loading = useSelector(state => state.loadingReducer.loading)
    const globalError = useSelector(state => state.errorReducer.globalError)
    const dispatch = useDispatch()

    useEffect(()=> {
        if(loggedIn) {
            history.push('/xcidic')
        }
    }, [loggedIn, history])

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }

    const handleEmailInput = (e) => {
        setLoginEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setLoginPassword(e.target.value)
    }

    return (
        <div className={styles.LandingPageContainer}>
            {
                loading
                && <Loading />
            }
            {
                globalError
                && <ErrorModal />
            }
            <div className={styles.LandingPageContent}>
                <div className={styles.pageTitle}>
                    <img className={styles.CompanyLogo} src={require('../assets/xcidic.png')} alt='Company Logo'/>
                    <p className={styles.TitleHeader}>Xcidic</p>
                </div>
                <div className={styles.AppTitle}>
                    <h2 className={styles.AppTitleName}>Daily Task Manager</h2>
                </div>
                {
                    loginError
                    && <div className={styles.LoginError}>Incorrect Email or Password</div>
                }
                <div className={styles.loginPart}>
                    <h1 style={{padding: 0, margin: 0, color: '#57606f'}}>Login</h1>
                    <form onSubmit={e => handleLogin(e)} className={styles.loginForm}>
                        <input
                            className={styles.loginData}
                            value={loginEmail}
                            onChange={handleEmailInput}
                            placeholder='Email'
                            type='email'
                            required
                            />

                        <br/>

                        <input
                            className={styles.loginData}
                            value={loginPassword}
                            onChange={handlePasswordInput}
                            placeholder='Password'
                            type='password'
                            minLength='6'
                            required
                            />

                        <br/>

                        <button className={styles.loginButton} type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
