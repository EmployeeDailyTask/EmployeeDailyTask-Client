import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const fetchTasks = () => {
    return (dispatch, getState) => {
        axios.get(`${baseUrl}/tasks`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                const userTasks = data
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
                })
            })
            .catch(err => {
                console.log(err.response, 'ERROR')
            })
    }
}

export const submitTask = (taskId) => {
    return (dispatch) => {
        axios.patch(`${baseUrl}/tasks/${taskId}`, { status: 'Submitted' }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                const userTasks = data
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
                })
            })
            .catch(err => {
                console.log(err.response, 'ERROR')
            })
    }
}

export const finishTask = (taskId) => {
    return (dispatch) => {
        axios.patch(`${baseUrl}/tasks/${taskId}`, { status: 'Finished' }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                const userTasks = data
                dispatch({
                    type: 'GET_DIVISION_TASKS',
                    payload: userTasks
                })
            })
            .catch(err => {
                console.log(err.response, 'ERROR')
            })
    }
}

export const createTask = (taskDetails) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/tasks`, {
            title: taskDetails.title,
            description: taskDetails.description
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            const userTasks = data
            dispatch({
                type: 'FETCH_TASKS',
                payload: {
                    tasks: userTasks
                }
            })
        })
        .catch(err => {
            console.log(err.response, 'ERROR')
        })
    }
}

export const editTask = (taskDetails) => {
    return (dispatch, getState) => {
        axios.put(`${baseUrl}/tasks/${taskDetails.taskId}`, {
            title: taskDetails.title,
            description: taskDetails.description
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            const userTasks = data
            if (taskDetails.page === 'manager') {
                dispatch({
                    type: 'GET_DIVISION_TASKS',
                    payload: userTasks
                })
            } else if (taskDetails.page === 'employee') {
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
                })
            }
        })
        .catch(err => {
            console.log(err.response, 'ERROR')
        })
    }
}

export const getStatusTasks = (status) => {
    return (dispatch) => {
        axios.get(`${baseUrl}/tasks/${status}`, {headers: {
            token: localStorage.getItem('token')
        }})
        .then(({ data }) => {
            const statusTasks = data
            dispatch({
                type: 'SET_STATUS_TASKS',
                payload: statusTasks
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getDivisionTasks = () => {
    return (dispatch) => {
        axios.get(`${baseUrl}/tasks/manager`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            const divisionTasks = data
            dispatch({
                type: 'GET_DIVISION_TASKS',
                payload: divisionTasks
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const deleteTask = (taskId, page) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/tasks/${taskId}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            const userTasks = data
            if (page === 'manager') {
                dispatch({
                    type: 'GET_DIVISION_TASKS',
                    payload: userTasks
                })
                dispatch({
                    type: 'CLOSE_DELETE_MODAL'
                })
            } else if (page === 'employee') {
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
                })
                dispatch({
                    type: 'CLOSE_DELETE_MODAL'
                })
            }
        })
        .catch(err => {
            console.log(err.response, 'ERROR')
        })
    }
}