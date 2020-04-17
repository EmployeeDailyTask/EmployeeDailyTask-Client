const initialState = {
    fullName: '',
    email: '',
    division: '',
    level: ''
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                division: action.payload.division,
                level: action.payload.level
            }
        default :
            return state
    }
}

export default userReducer