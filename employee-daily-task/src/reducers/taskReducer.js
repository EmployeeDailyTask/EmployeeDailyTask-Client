const initialState = {
    activeTasks: [],
    expiredTasks: [],
    submittedTasks: [],
    finishedTasks: [],
    todayTasks: [],
    statusTasks: [],
    divisionTasks: []
}

const taskReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS' :
            const todayDate = new Date()
            const startOfDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
            
            const active = action.payload.tasks.filter(task => task.status === 'Active')
            const expired = action.payload.tasks.filter(task => task.status === 'Expired')
            const submitted = action.payload.tasks.filter(task => task.status === 'Submitted')
            const finished = action.payload.tasks.filter(task => task.status === 'Finished')
            const today = action.payload.tasks.filter(task => new Date(task.createdAt) > startOfDay)
            return {
                ...state,
                activeTasks: active,
                expiredTasks: expired,
                submittedTasks: submitted,
                finishedTasks: finished,
                todayTasks: today
            }
        case 'SET_STATUS_TASKS':
            return {
                ...state,
                statusTasks: action.payload
            }
        case 'GET_DIVISION_TASKS':
            return {
                ...state,
                divisionTasks: action.payload
            }
        default :
            return state
    }
}

export default taskReducer