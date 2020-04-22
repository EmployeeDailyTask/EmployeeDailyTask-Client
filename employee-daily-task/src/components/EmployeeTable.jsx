import React from 'react'
import styles from '../styles/HRPageStyle.module.css'

export default function EmployeeTable ({ employeeList }) {
    return (
        <div className={styles.EmployeeTable}>
            <div className={styles.TableHeaderContainer}>
                <div className={styles.EmployeeTableHeader}>Employee Name</div>
                <div className={styles.EmployeeTableHeader}>Employee Email</div>
                <div className={styles.EmployeeTableHeader}>Division</div>
                <div className={styles.EmployeeTableHeader}>Level</div>
            </div>
            <div className={styles.EmployeeTableContent}>
                {
                    employeeList.map((employee, i) => {
                        if(i%2 === 0) {
                            return (
                                <div className={styles.EmployeeTableRowOdd} key={employee._id}>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.fullName}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.email}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.division}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.level}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className={styles.EmployeeTableRowEven} key={employee._id}>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.fullName}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.email}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.division}
                                    </div>
                                    <div className={styles.EmployeeTableValue}>
                                        {employee.level}
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}