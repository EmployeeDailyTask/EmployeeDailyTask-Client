import React from 'react'
import styles from '../styles/GlobalStyle.module.css'
import { useRouteMatch } from 'react-router-dom'

export default function StatusMenu ({ title, history }) {
    const { path } = useRouteMatch()

    const handlePageNavigation = targetPath => {
        if(title === 'Today') {
            history.push(path)
        } else {
            history.push(targetPath)
        }
    }

    if(title === 'Finished') {
        return (
            <div onClick={() => handlePageNavigation(`${path}/${title}`)} className={styles.TasksMenuItem} style={{borderRight: '2px solid #ffa502'}}>
                {title}
            </div>
            )
    } else {
        return (
            <div onClick={() => handlePageNavigation(`${path}/${title}`)} className={styles.TasksMenuItem}>
                {title}
            </div>
            )
    }
}