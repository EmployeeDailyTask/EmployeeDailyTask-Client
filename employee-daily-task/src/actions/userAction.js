import axios from 'axios'
const baseUrl = 'http://18.139.114.88:3000'

export const login = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'LOGIN_LOADING'
        })
        axios.post(`${baseUrl}/login`, {
            email,
            password
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const userData = data
            localStorage.setItem('token', userData.token)
            dispatch({
                type: 'LOGIN',
                payload: userData
            })
        })
        .catch((err) => {
            console.log(err.response)
            dispatch({
                type: 'CLEAR_LOADING'
            })
            dispatch({
                type: 'LOGIN_ERROR'
            })
        })
    }
}

export const changePassword = (oldPass, newPass) => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'CHANGEPASS_LOADING'
        })
        axios.patch(`${baseUrl}/user`, {
            oldPassword: oldPass,
            newPassword: newPass
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(() => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            dispatch({
                type: 'TOGGLE_CHANGE_MODAL'
            })
            dispatch({
                type: 'OPEN_SUCCESS_MODAL',
                payload: 'Successfully Changed Password!'
            })
            setTimeout(function(){ dispatch({
                type: 'CLOSE_SUCCESS_MODAL'
            }) }, 1500);
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

export const getUserData = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERROR'
        })
        dispatch({
            type: 'LOGIN_LOADING'
        })
        axios.get(`${baseUrl}/user`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            dispatch({
                type: 'CLEAR_LOADING'
            })
            const userData = data
            dispatch({
                type: 'LOGIN',
                payload: userData
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

export const logout = () => {
    return({
        type: 'LOGOUT'
    })
}
