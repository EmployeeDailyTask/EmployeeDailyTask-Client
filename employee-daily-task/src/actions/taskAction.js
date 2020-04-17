import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const fetchTasks = () => {
    return (dispatch, getState) => {
        axios.get(`${baseUrl}/tasks`, {headers: {
            token: localStorage.getItem('token')
        }})
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