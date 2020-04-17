const initialState = {
    activeTasks: [],
    expiredTasks: [],
    submittedTasks: [],
    finishedTasks: []
}

const taskReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS' :
            const active = action.payload.tasks.filter(task => task.status === 'Active')
            const expired = action.payload.tasks.filter(task => task.status === 'Expired')
            const submitted = action.payload.tasks.filter(task => task.status === 'Submitted')
            const finished = action.payload.tasks.filter(task => task.status === 'Finished')
            return {
                ...state,
                activeTasks: active,
                expiredTasks: expired,
                submittedTasks: submitted,
                finishedTasks: finished
            }
        default :
            return state
    }
}

export default taskReducer