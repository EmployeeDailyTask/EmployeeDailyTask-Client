const initialState = {
    fullName: '',
    email: '',
    division: '',
    level: '',
    id: ''
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                division: action.payload.division,
                level: action.payload.level,
                id: action.payload._id
            }
        case 'LOGOUT' :
            return {
                ...state,
                fullName: null,
                email: null,
                division: null,
                level: null,
                id: null
            }
        default :
            return state
    }
}

export default userReducer