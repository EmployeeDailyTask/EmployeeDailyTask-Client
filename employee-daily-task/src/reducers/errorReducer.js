const initialState = {
    loginError: false,
    globalError: false,
    message: null
}

const errorReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR' :
            return {
                ...state,
                loginError: true
            }
        case 'GLOBAL_ERROR' :
            return {
                ...state,
                globalError: true,
                message: action.payload
            }
        case 'CLEAR_ERROR' :
            return {
                ...state,
                loginError: false,
                globalError: false,
                message: null
            }
        default :
            return state
    }
}

export default errorReducer