import React, { useState } from 'react'
import styles from '../styles/GlobalStyle.module.css'
import { useDispatch } from 'react-redux'
import {
    toggleChangePassModal,
} from '../actions/modalAction'

export default function Header ({handleLogout}) {
    const [userMenu, setUserMenu] = useState(false)
    const [userMenuStyle, setUserMenuStyle] = useState(null)
    const dispatch = useDispatch()

    const toggleUserMenu = () => {
        if (userMenu) {
            setUserMenuStyle(null)
        } else {
            setUserMenuStyle({
                border: '3px solid black'
            })
        }
        setUserMenu(!userMenu)
    }

    const handleChangeModal = () => {
        dispatch(toggleChangePassModal())
        toggleUserMenu()
    }

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
                <div onClick={() => toggleUserMenu()} className={styles.UserPic} style={userMenuStyle}>
                    <img alt='User Logo' style={{height: '95%', width: '95%', objectFit: 'contain'}} src={require('../assets/userIcon.png')} />
                </div>
                {
                    userMenu
                    && <div className={styles.userMenu}>
                        <div onClick={() => handleChangeModal()} className={styles.MenuItem}>Change Password</div>
                        <div onClick={() => handleLogout()} className={styles.MenuItem}>LogOut</div>
                    </div>
                }
            </div>
        </div>
    )
}