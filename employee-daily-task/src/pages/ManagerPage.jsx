import React, { useEffect, useState } from 'react'
import styles from '../styles/ManagerPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../components/StatusTaskCard'
import {
    getDivisionTasks
} from '../actions/taskAction'
import {
    getDivisionEmployee
} from '../actions/employeeAction'

export default function ManagerPage ({ history }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedStatus, setSelectedStatus] = useState('All')
    const [selectedEmployee, setSelectedEmployee] = useState('All')
    const [selectedTasks, setSelectedTasks] = useState([])
    
    const userLevel = useSelector(state => state.userReducer.level)
    const division = useSelector(state => state.userReducer.division)
    const employeeList = useSelector(state => state.employeeReducer.divisionEmployee)
    const divisionTasks = useSelector(state => state.taskReducer.divisionTasks)

    const dispatch = useDispatch()

    useEffect(() => {
        if(userLevel !== 'Manager') {
            history.goBack()
        }
    }, [userLevel, history])

    useEffect(() => {
        dispatch(getDivisionEmployee())
        dispatch(getDivisionTasks())
    }, [dispatch])

    useEffect(() => {
        let local = new Date(selectedDate)
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset())
        setSelectedDate(local.toJSON().slice(0,10))
        if(divisionTasks.length > 0) {
            const startOfDay = getStartOfDay(selectedDate)
            setSelectedTasks(divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString()))
        }
    }, [selectedDate, divisionTasks])

    const getStartOfDay = targetDate => {
        const day = new Date(targetDate)
        return new Date(day.getFullYear(), day.getMonth(), day.getDate())
    }

    const handleStatusFilter = e => {
        let startOfDay = getStartOfDay(selectedDate)
        let newSelectedStatus = e.target.value
        let newSelectedTasks
        if(selectedEmployee === 'All') {
            if(newSelectedStatus === 'All') {
                newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            } else {
                newSelectedTasks = divisionTasks.filter(task => task.status === newSelectedStatus && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            }
        } else {
            if(newSelectedStatus === 'All') {
                newSelectedTasks = divisionTasks.filter(task => task.owner._id === selectedEmployee && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            } else {
                newSelectedTasks = divisionTasks.filter(task => task.status === newSelectedStatus && task.owner._id === selectedEmployee && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            }
        }
        setSelectedStatus(newSelectedStatus)
        setSelectedTasks(newSelectedTasks)
    }

    const handleEmployeeFilter = e => {
        let startOfDay = getStartOfDay(selectedDate)
        let newSelectedEmployee = e.target.value
        let newSelectedTasks
        if(selectedStatus === 'All') {
            if(newSelectedEmployee === 'All') {
                newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            } else {
                newSelectedTasks = divisionTasks.filter(task => task.owner._id === newSelectedEmployee && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            }
        } else {
            if(newSelectedEmployee === 'All') {
                newSelectedTasks = divisionTasks.filter(task => task.status === selectedStatus && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            } else {
                newSelectedTasks = divisionTasks.filter(task => task.status === selectedStatus && task.owner._id === newSelectedEmployee && new Date(task.createdAt).toDateString() === startOfDay.toDateString())
            }
        }
        setSelectedEmployee(newSelectedEmployee)
        setSelectedTasks(newSelectedTasks)
    }

    const handleDateFilter = e => {
        const startOfDay = getStartOfDay(e.target.value)
        let newSelectedTasks
        if (selectedEmployee === 'All' && selectedEmployee === 'All') {
            newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString())
        } else {
            if (selectedEmployee !== 'All' && selectedStatus !== 'All') {
                newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString() && task.owner._id === selectedEmployee && task.status === selectedStatus)
            } else if (selectedEmployee !== 'All' && selectedStatus === 'All') {
                newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString() && task.owner._id === selectedEmployee)
            } else if (selectedEmployee === 'All' && selectedStatus !== 'All') {
                newSelectedTasks = divisionTasks.filter(task => new Date(task.createdAt).toDateString() === startOfDay.toDateString() && task.status === selectedStatus)
            }
        }
        setSelectedDate(new Date(e.target.value))
        setSelectedTasks(newSelectedTasks)
    }

    return (
        <div className={styles.ManagerPage}>
            <div className={styles.ManagerPageTitle}>Manager Menu (Division: {division})</div>
            <div className={styles.ManagerMainContainer}>
                <div className={styles.ManagerTopSection}>
                    Employee: 
                    <select onChange={e => handleEmployeeFilter(e)} className={styles.ManagerPageDropdown} name="employeeList">
                        <option value="All">All Employee</option>
                        {
                            employeeList.map(employee => {
                                return (
                                <option key={employee._id} value={employee._id}>{employee.fullName}</option>
                                )
                            })
                        }
                    </select>
                    Task Status:
                    <select onChange={e => handleStatusFilter(e)} className={styles.ManagerPageDropdown} name="taskStatus">
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Finished">Finished</option>
                        <option value="Expired">Expired</option>
                    </select>
                    Date:
                    <input onChange={e => handleDateFilter(e)} value={selectedDate} className={styles.ManagerPageDate} type="date"/>
                </div>
                <div className={styles.ManagerTaskContent}>
                    {
                        selectedTasks.map(task => {
                            return (
                                <TaskCard task={task} key={task._id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}