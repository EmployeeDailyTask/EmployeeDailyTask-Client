const initialState = {
    taskCardModal: false,
    taskCardModalContent: null,
    deleteModal: false,
    deleteModalContent: null,
    registerModal: false,
    changePasswordModal: false,
    successModal: false,
    successMessage: ''
}

const taskReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'OPEN_TASK_MODAL':
            return {
                ...state,
                taskCardModal: 'details',
                taskCardModalContent: action.payload
            }
        case 'OPEN_CREATE_MODAL':
            return {
                ...state,
                taskCardModal: 'create'
            }
        case 'CLOSE_CREATE_MODAL':
            return {
                ...state,
                taskCardModal: false,
                taskCardModalContent: null
            }
        case 'OPEN_MANAGER_MODAL':
            return {
                ...state,
                taskCardModal: 'manager',
                taskCardModalContent: action.payload
            }
        case 'OPEN_DELETE_MODAL':
            return {
                ...state,
                deleteModal: true,
                deleteModalContent: action.payload.taskDetails
            }
        case 'CLOSE_DELETE_MODAL':
            return {
                ...state,
                deleteModal: false,
                deleteModalContent: null
            }
        case 'OPEN_REGISTER_MODAL':
            return {
                ...state,
                registerModal: true
            }
        case 'CLOSE_REGISTER_MODAL':
            return {
                ...state,
                registerModal: false
        }
        case 'TOGGLE_CHANGE_MODAL':
            return {
                ...state,
                changePasswordModal: !state.changePasswordModal
            }
        case 'OPEN_SUCCESS_MODAL':
            return {
                ...state,
                successModal: true,
                successMessage: action.payload
            }
        case 'CLOSE_SUCCESS_MODAL':
            return {
                ...state,
                successModal: false,
                successMessage: ''
            }
        default: 
        return state
    }
}

export default taskReducer