import React, { useEffect } from 'react'
import styles from '../styles/HRPageStyle.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllEmployee
} from '../actions/employeeAction'
import {
    openRegisterModal
} from '../actions/modalAction'
import EmployeeTable from '../components/EmployeeTable'

export default function HRPage () {
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [levelInput, setLevelInput] = useState('All')
    const [divisionInput, setDivisionInput] = useState('All')
    const [filteredEmployee, setFilteredEmployee] = useState([])
    const employeeList = useSelector(state => state.employeeReducer.allEmployee)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEmployee())
    }, [dispatch])

    useEffect(() => {
        if(employeeList.length > 0) {
            setFilteredEmployee(employeeList)
        }
    }, [employeeList])

    const toggleRegisterModal = () => {
        dispatch(openRegisterModal())
    }

    const handleNameInput = e => {
        let newFilteredEmployee
        if(emailInput) {
            setEmailInput('')
        }
        if (levelInput === 'All' && divisionInput ==='All') {
            newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(e.target.value))
        } else if (levelInput !== 'All' && divisionInput ==='All') {
            newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(e.target.value) && employee.division === divisionInput)
        } else if (levelInput === 'All' && divisionInput !=='All') {
            newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(e.target.value) && employee.level === levelInput)
        } else if (levelInput !== 'All' && divisionInput !=='All') {
            newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(e.target.value) && employee.level === levelInput && employee.division === divisionInput)
        }
        setFilteredEmployee(newFilteredEmployee)
        setNameInput(e.target.value)
    }

    const handleEmailInput = e => {
        let newFilteredEmployee
        if(nameInput) {
            setNameInput('')
        }
        if (levelInput === 'All' && divisionInput ==='All') {
            newFilteredEmployee = employeeList.filter(employee => employee.email.includes(e.target.value))
        } else if (levelInput !== 'All' && divisionInput === 'All') {
            newFilteredEmployee = employeeList.filter(employee => employee.email.includes(e.target.value) && employee.division === divisionInput)
        } else if (levelInput === 'All' && divisionInput !== 'All') {
            newFilteredEmployee = employeeList.filter(employee => employee.email.includes(e.target.value) && employee.level === levelInput)
        } else if (levelInput !== 'All' && divisionInput !== 'All') {
            newFilteredEmployee = employeeList.filter(employee => employee.email.includes(e.target.value) && employee.level === levelInput && employee.division === divisionInput)
        }
        setFilteredEmployee(newFilteredEmployee)
        setEmailInput(e.target.value)
    }

    const handleLevelInput = e => {
        let newFilteredEmployee
        let targetLevel = e.target.value
        if(targetLevel === 'All') {
            if(divisionInput !== 'All') {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) &&
                employee.email.includes(emailInput) && employee.division === divisionInput)
            } else {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) &&
                employee.email.includes(emailInput))
            }
        } else {
            if(divisionInput !== 'All') {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) &&
                employee.email.includes(emailInput) && employee.level === targetLevel && employee.division === divisionInput)
            } else {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) &&
                employee.email.includes(emailInput) && employee.level === targetLevel)
            }
        }
        setFilteredEmployee(newFilteredEmployee)
        setLevelInput(e.target.value)
    }

    const handleDivisionInput = e => {
        let newFilteredEmployee
        let targetDivision = e.target.value
        if(targetDivision === 'All') {
            if(levelInput !== 'All') {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) && employee.email.includes(emailInput) && employee.level === levelInput)
            } else {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) && employee.email.includes(emailInput))
            }
        } else {
            if(levelInput !== 'All') {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) && employee.email.includes(emailInput) && employee.division === targetDivision && employee.level === levelInput)
            } else {
                newFilteredEmployee = employeeList.filter(employee => employee.fullName.includes(nameInput) && employee.email.includes(emailInput) && employee.division === targetDivision)
            }
        }
        setFilteredEmployee(newFilteredEmployee)
        setDivisionInput(e.target.value)
    }

    return (
        <div className={styles.HRPage}>
            <div className={styles.HRPageTitle}>Human Resources Menu</div>
            <div className={styles.HRPageMenu}>
                <div className={styles.HRMenuItem}>
                    <input onChange={e => handleNameInput(e)} value={nameInput} className={styles.SearchInput} placeholder='Search by name. . .' type="text"/>
                </div>
                <div className={styles.HRMenuItem}>
                    <input onChange={e => handleEmailInput(e)} value={emailInput} className={styles.SearchInput} placeholder='Search by email. . .' type="text"/>
                </div>
                <div className={styles.HRMenuItem}>
                    <select onChange={e => handleDivisionInput(e)} className={styles.SearchInput} name="filterDivision">
                        <option value="All">All Division</option>
                        <option value="IT">IT Division</option>
                        <option value="Human Resources">Human Resources Division</option>
                    </select>
                </div>
                <div className={styles.HRMenuItem}>
                <select onChange={e => handleLevelInput(e)} className={styles.SearchInput} name="filterLevel">
                        <option value="All">All Level</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
            </div>
            <div className={styles.HREmployeeList}>
                <button className={styles.RegisterEmployeeButton} onClick={() => toggleRegisterModal()}>+ Register Employee</button>
                <EmployeeTable employeeList={filteredEmployee} />
            </div>
        </div>
    )
}