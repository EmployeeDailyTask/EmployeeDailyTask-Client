const initialState = {
    taskCardModal: false,
    taskCardModalContent: null,
    deleteModal: false,
    deleteModalContent: null
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
        default: 
        return state
    }
}

export default taskReducer