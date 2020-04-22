import axios from 'axios'

const baseURL = `http://18.139.114.88:3000`

export const getDivisionEmployee = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'MANAGER_LOADING'
        })
        axios.get(`${baseURL}/manager/employee`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const divisionEmployee = data
            dispatch({
                type: 'GET_DIVISION_EMPLOYEE',
                payload: divisionEmployee
            })
        })
        .catch(err => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            dispatch({
                type: 'GLOBAL_ERROR',
                payload: err.response.data
            })
        })
    }
}

export const getAllEmployee = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'HR_LOADING'
        })
        axios.get(`${baseURL}/hr/employee`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const employeeList = data
            dispatch({
                type: 'GET_ALL_EMPLOYEE',
                payload: employeeList
            })
        })
        .catch(err => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            dispatch({
                type: 'GLOBAL_ERROR',
                payload: err.response.data
            })
        })
    }
}

export const registerEmployee = (employeeDetails) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'REGISTER_LOADING'
        })
        dispatch({
            type: 'CLOSE_REGISTER_MODAL'
        })
        axios.post(`${baseURL}/register`, {
            firstName: employeeDetails.firstName,
            lastName: employeeDetails.lastName,
            email: employeeDetails.email,
            division: employeeDetails.division,
            level: employeeDetails.level
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            let newEmployee = data
            dispatch({
                type: 'OPEN_SUCCESS_MODAL',
                payload: `Successfully Registered ${newEmployee.email}!`
            })
            dispatch({
                type: 'REGISTER',
                payload: newEmployee
            })
            setTimeout(function(){ dispatch({
                type: 'CLOSE_SUCCESS_MODAL'
            }) }, 1500)
        })
        .catch(err => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            dispatch({
                type: 'GLOBAL_ERROR',
                payload: err.response.data
            })
        })
    }
}