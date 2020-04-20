import fullName from '../helpers/getFullName'

const initialState = {
    divisionEmployee: [],
    allEmployee: []
}

const employeeReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_DIVISION_EMPLOYEE':
            let divisionEmployeeData = action.payload
            for (let i = 0; i < divisionEmployeeData.length; i++) {
                divisionEmployeeData[i].fullName = fullName(divisionEmployeeData[i].firstName, divisionEmployeeData[i].lastName)
            }
            return {
                ...state,
                divisionEmployee: divisionEmployeeData
            }
        default :
        return state
    }
}

export default employeeReducer