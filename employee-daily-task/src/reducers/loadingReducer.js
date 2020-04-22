const initialState = {
    loading: false,
    message: null
}

const loadingReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Logging in. . .'
            }
        case 'GLOBAL_LOADING' :
            return {
                ...state,
                loading: true
            }
        case 'STATUS_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Fetching Tasks. . .'
            }
        case 'CREATE_TASK_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Creating task. . .'
            }
        case 'EDIT_TASK_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Updating task. . .'
            }
        case 'SUBMIT_TASK_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Submitting task. . .'
            }
        case 'FINISH_TASK_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Finishing task. . .'
            }
        case 'DELETE_TASK_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Deleting task. . .'
            }
        case 'MANAGER_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Fetching Employee Data and Tasks. . .'
            }
        case 'REGISTER_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Registering Employee. . .'
            }
        case 'CHANGEPASS_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Changing your password. . .'
            }
        case 'HR_LOADING' :
            return {
                ...state,
                loading: true,
                message: 'Fetching Employee Data. . .'
            }
        case 'CLEAR_LOADING' :
            return {
                ...state,
                loading: false,
                message: null
            }
        default :
            return state
    }
}

export default loadingReducer