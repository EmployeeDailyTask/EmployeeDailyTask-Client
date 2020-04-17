import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export const login = (email, password) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/login`, {
            email,
            password
        })
        .then(({ data }) => {
            const userData = data
            dispatch({
                type: 'LOGIN',
                payload: userData
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}