const initialState = {
    fullName: '',
    email: '',
    token: '',
    division: '',
    level: ''
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN' :
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                token: action.payload.token,
                division: action.payload.division,
                level: action.payload.level
            }
    }
}

export default userReducer