import React from 'react'
import styles from '../styles/TasksPageStyle.module.css'
import StatusMenu from '../components/StatusMenu'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
    TodayTaskPage,
    StatusTasksPage
} from '../pages'

export default function TasksPage ({ history }) {
    const { path } = useRouteMatch()
    return (
        <div className={styles.TasksPageContainer}>
            <div className={styles.TasksMenuBar}>
                <StatusMenu title='Today' history={history} />
                <StatusMenu title='Expired' history={history} />
                <StatusMenu title='Submitted' history={history} />
                <StatusMenu title='Finished' history={history} />
            </div>
            <div className={styles.TasksContentContainer}>
                <Switch>
                    <Route exact path={path} component={TodayTaskPage} />
                    <Route path={`${path}/:status`} component={StatusTasksPage} />
                </Switch>
            </div>
        </div>
    )
}