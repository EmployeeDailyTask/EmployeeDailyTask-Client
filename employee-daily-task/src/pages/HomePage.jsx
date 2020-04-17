import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/HomePage.module.css'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Switch, Route } from 'react-router-dom'
import OverviewPage from './OverviewPage'
import { fetchTasks } from '../actions/taskAction'

export default function HomePage ({ history }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    return (
        <div className={styles.HomePageContainer}>
            <Header />
            <div className={styles.MainContainer}>
            <SideBar history={history} />
            <Switch>
                <Route exact path='/home' component={OverviewPage} />
            </Switch>
            </div>
        </div>
    )
}