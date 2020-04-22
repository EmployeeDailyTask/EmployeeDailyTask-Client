import axios from 'axios'

const baseUrl = 'http://18.139.114.88:3000'

export const fetchTasks = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'GLOBAL_LOADING'
        })
        axios.get(`${baseUrl}/tasks`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: 'CLEAR_LOADING'
                })
                const userTasks = data
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
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

export const submitTask = (taskId) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'SUBMIT_TASK_LOADING'
        })
        axios.patch(`${baseUrl}/tasks/${taskId}`, { status: 'Submitted' }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: 'CLEAR_ERROR'
                })
                dispatch({
                    type: 'CLEAR_LOADING'
                })
                const userTasks = data
                dispatch({
                    type: 'FETCH_TASKS',
                    payload: {
                        tasks: userTasks
                    }
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

export const finishTask = (taskId) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'FINISH_TASK_LOADING'
        })
        axios.patch(`${baseUrl}/tasks/${taskId}`, { status: 'Finished' }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: 'CLEAR_LOADING'
                })
                const userTasks = data
                dispatch({
                    type: 'GET_DIVISION_TASKS',
                    payload: userTasks
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

export const createTask = (taskDetails) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'CREATE_TASK_LOADING'
        })
        axios.post(`${baseUrl}/tasks`, {
            title: taskDetails.title,
            description: taskDetails.description
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_ERROR'
            })
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const userTasks = data
            dispatch({
                type: 'FETCH_TASKS',
                payload: {
                    tasks: userTasks
                }
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

export const editTask = (taskDetails) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'EDIT_TASK_LOADING'
        })
        axios.put(`${baseUrl}/tasks/${taskDetails.taskId}`, {
            title: taskDetails.title,
            description: taskDetails.description
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
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

export const getStatusTasks = (status) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'STATUS_LOADING'
        })
        axios.get(`${baseUrl}/tasks/${status}`, {headers: {
            token: localStorage.getItem('token')
        }})
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const statusTasks = data
            dispatch({
                type: 'SET_STATUS_TASKS',
                payload: statusTasks
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

export const getDivisionTasks = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'MANAGER_LOADING'
        })
        axios.get(`${baseUrl}/tasks/manager`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const divisionTasks = data
            dispatch({
                type: 'GET_DIVISION_TASKS',
                payload: divisionTasks
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

export const deleteTask = (taskId, page) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'DELETE_TASK_LOADING'
        })
        axios.delete(`${baseUrl}/tasks/${taskId}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
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