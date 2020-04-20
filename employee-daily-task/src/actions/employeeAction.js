import axios from 'axios'

const baseURL = `http://localhost:3000`

export const getDivisionEmployee = () => {
    return (dispatch) => {
        axios.get(`${baseURL}/manager/employee`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            const divisionEmployee = data
            dispatch({
                type: 'GET_DIVISION_EMPLOYEE',
                payload: divisionEmployee
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}