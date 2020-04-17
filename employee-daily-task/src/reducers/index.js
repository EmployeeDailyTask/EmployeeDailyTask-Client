import {
combineReducers
} from 'redux'

import userReducer from './userReducer'
import taskReducer from './taskReducer'

const reducers = combineReducers({
    userReducer,
    taskReducer
})

export default reducers