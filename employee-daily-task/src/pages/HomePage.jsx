import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/HomePage.module.css'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import TaskModal from '../components/TaskModal'
import DeleteModal from '../components/DeleteModal'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
    OverviewPage,
    TasksPage,
    ManagerPage,
    HRPage
} from '../pages'
import { fetchTasks } from '../actions/taskAction'
import { getUserData, logout } from '../actions/userAction'

export default function HomePage ({ history }) {
    const loggedUser = useSelector(state => state.userReducer.fullname)
    const taskModal = useSelector(state => state.modalReducer.taskCardModal)
    const deleteModalStatus = useSelector(state => state.modalReducer.deleteModal)
    const dispatch = useDispatch()
    const { path } = useRouteMatch()

    useEffect(() => {
        dispatch(fetchTasks())
        if (!loggedUser && localStorage.getItem('token')) {
            dispatch(getUserData())
        } else {
            history.push('/')
        }
    }, [history, loggedUser, dispatch])

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        history.push('/')
    }

    return (
        <div className={styles.HomePageContainer}>
            {
                taskModal
                && <TaskModal />
            }
            {
                deleteModalStatus
                && <DeleteModal />
            }
            <Header handleLogout={logOut} />
            <div className={styles.MainContainer}>
            <SideBar history={history} />
            <Switch>
                <Route exact path={path} component={OverviewPage} />
                <Route path={`${path}/tasks`} component={TasksPage} />
                <Route path={`${path}/manager`} component={ManagerPage} />
                <Route path={`${path}/HR`} component={HRPage} />
            </Switch>
            </div>
        </div>
    )
}