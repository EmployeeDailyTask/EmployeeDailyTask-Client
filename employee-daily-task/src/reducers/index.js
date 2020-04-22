import {
combineReducers
} from 'redux'

import userReducer from './userReducer'
import taskReducer from './taskReducer'
import modalReducer from './modalReducer'
import employeeReducer from './employeeReducer'
import errorReducer from './errorReducer'
import loadingReducer from './loadingReducer'

const reducers = combineReducers({
    userReducer,
    taskReducer,
    modalReducer,
    employeeReducer,
    errorReducer,
    loadingReducer
})

export default reducers