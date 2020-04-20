import React from 'react'
import styles from '../styles/GlobalStyle.module.css'
import { useSelector } from 'react-redux'

export default function SideBar ({ history }) {
    const loggedUserLevel = useSelector(state => state.userReducer.level)
    const loggedUserDivision = useSelector(state => state.userReducer.division )
    const linkHandle = path => {
        history.push(path)
    }
    return (
        <div className={styles.SideBarContainer}>
            <div onClick={() => linkHandle('/xcidic')} style={{borderTopLeftRadius: '25px', borderTopRightRadius: '10px'}} className={styles.SideBarMenuItems}>
                Home
            </div>
            <div className={styles.SideBarMenuItems} onClick={() => linkHandle('/xcidic/tasks')}>
                Tasks
            </div>
            {
                loggedUserLevel === 'Manager'
                && <div className={styles.SideBarMenuItems} onClick={() => linkHandle('/xcidic/manager')}>
                        Manager Menu
                    </div>
            }
            {
                loggedUserDivision === 'Human Resources'
                && <div className={styles.SideBarMenuItems} onClick={() => linkHandle('/xcidic/HR')}>
                        Human Resources Menu
                    </div>
            }
            <div className={styles.SideBarMenuItems} onClick={() => linkHandle('/xcidic/HR')}>
                        Human Resources Menu
                    </div>
        </div>
    )
}