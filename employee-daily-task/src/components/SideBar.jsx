import React from 'react'
import styles from '../styles/GlobalStyle.module.css'

export default function SideBar ({ history }) {
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
            <div className={styles.SideBarMenuItems}>
                Manager Menu
            </div>
            <div className={styles.SideBarMenuItems}>
                Human Resources Menu
            </div>
        </div>
    )
}