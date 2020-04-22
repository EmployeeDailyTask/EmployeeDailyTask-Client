import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/HomePage.module.css'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import TaskModal from '../components/TaskModal'
import DeleteModal from '../components/DeleteModal'
import RegisterModal from '../components/RegisterModal'
import ChangePasswordModal from '../components/ChangePasswordModal'
import SuccessModal from '../components/SuccessModal'
import Loading from '../components/Loading'
import ErrorModal from '../components/ErrorModal'
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
    const registerModal = useSelector(state => state.modalReducer.registerModal)
    const deleteModalStatus = useSelector(state => state.modalReducer.deleteModal)
    const changePasswordModal = useSelector(state => state.modalReducer.changePasswordModal)
    const successModal = useSelector(state => state.modalReducer.successModal)
    const loading = useSelector(state => state.loadingReducer.loading)
    const errorModal = useSelector(state => state.errorReducer.globalError)
    const loadingMessage = useSelector(state => state.loadingReducer.message)
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
                errorModal
                && <ErrorModal />
            }
            {
                loading && loadingMessage
                && <Loading />
            }
            {
                taskModal
                && <TaskModal />
            }
            {
                deleteModalStatus
                && <DeleteModal />
            }
            {
                registerModal
                && <RegisterModal />
            }
            {
                changePasswordModal
                && <ChangePasswordModal />
            }
            {
                successModal
                && <SuccessModal />
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