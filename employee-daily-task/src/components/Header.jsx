import React from 'react'
import styles from '../styles/GlobalStyle.module.css'

export default function Header () {
    return (
        <div className={styles.HeaderContainer}>
            <div className={styles.LogoSection}>
                <img className={styles.CompanyLogo} src={require('../assets/xcidic.png')} alt='Company Logo' />
                    <div className={styles.CompanyDetailsContainer}>
                        <p className={styles.CompanyDetails}>Xcidic</p>
                        <p className={styles.CompanyDetails}>Daily Task Manager</p>
                    </div>
            </div>
            <div className={styles.UserMenuContainer}>
                <div className={styles.UserPic}>
                    <img style={{height: '95%', width: '95%', objectFit: 'contain'}} src={require('../assets/userIcon.png')} />
                </div>
            </div>
        </div>
    )
}