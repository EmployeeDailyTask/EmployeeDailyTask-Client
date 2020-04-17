import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/HomePage.module.css'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
    OverviewPage,
    TasksPage
} from '../pages'
import { fetchTasks } from '../actions/taskAction'
import { getUserData } from '../actions/userAction'

export default function HomePage ({ history }) {
    const loggedUser = useSelector(state => state.userReducer.fullname)
    const dispatch = useDispatch()
    const { path } = useRouteMatch()

    useEffect(() => {
        dispatch(fetchTasks())
        if (!loggedUser && localStorage.getItem('token')) {
            dispatch(getUserData())
        } else {
            history.push('/')
        }
    }, [])

    return (
        <div className={styles.HomePageContainer}>
            <Header />
            <div className={styles.MainContainer}>
            <SideBar history={history} />
            <Switch>
                <Route exact path='/xcidic' component={OverviewPage} />
                <Route exact path='/xcidic/tasks' component={TasksPage} />
            </Switch>
            </div>
        </div>
    )
}