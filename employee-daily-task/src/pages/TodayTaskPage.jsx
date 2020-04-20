import React from 'react'
import styles from '../styles/TodayTaskPageStyle.module.css'
import TodayTaskContainer from '../components/TodayTaskContainer'
import {
    useSelector
} from 'react-redux'

export default function TodayTaskPage () {
    const todayTasks = useSelector(state => state.taskReducer.todayTasks)

    return (
        <div className={styles.TodayTaskPageContainer}>
            <TodayTaskContainer title={'Active'} tasks={todayTasks.filter(task => task.status==='Active')} />
            <TodayTaskContainer title={'Submitted'} tasks={todayTasks.filter(task => task.status==='Submitted')} />
            <TodayTaskContainer title={'Finished'} tasks={todayTasks.filter(task => task.status==='Finished')} />
        </div>
    )
}