import fullName from '../helpers/getFullName'

const initialState = {
    divisionEmployee: [],
    allEmployee: [],
    newEmployee: null
}

const employeeReducer = (state = initialState, action) => {
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
        case 'GET_ALL_EMPLOYEE':
            let employeeData = action.payload
            for (let i = 0; i < employeeData.length; i++) {
                employeeData[i].fullName = fullName(employeeData[i].firstName, employeeData[i].lastName)
            }
            return {
                ...state,
                allEmployee: employeeData
            }
        case 'REGISTER':
            let newEmployeeData = {...action.payload, fullName: `${action.payload.firstName} ${action.payload.lastName}`}
            return {
                ...state,
                allEmployee: [...state.allEmployee, newEmployeeData] 
            }
        default:
            return state
    }
}

export default employeeReducer