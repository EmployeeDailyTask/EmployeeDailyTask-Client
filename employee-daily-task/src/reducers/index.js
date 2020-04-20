import {
combineReducers
} from 'redux'

import userReducer from './userReducer'
import taskReducer from './taskReducer'
import modalReducer from './modalReducer'
import employeeReducer from './employeeReducer'

const reducers = combineReducers({
    userReducer,
    taskReducer,
    modalReducer,
    employeeReducer
})

export default reducers