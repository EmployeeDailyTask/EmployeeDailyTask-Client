export const openTaskModal = (task) => ({
    type: 'OPEN_TASK_MODAL',
    payload: task
})

export const toggleCreateModal = () => ({
    type: 'OPEN_CREATE_MODAL'
})

export const toggleManagerModal = (task) => ({
    type: 'OPEN_MANAGER_MODAL',
    payload: task
})

export const closeTaskModal = () => ({
    type: 'CLOSE_CREATE_MODAL'
})

export const openDeleteModal = (taskId, page) => ({
    type: 'OPEN_DELETE_MODAL',
    payload: {
        taskDetails: {
            taskId,
            page
        }
    }
})

export const closeDeleteModal = () => ({
    type: 'CLOSE_DELETE_MODAL'
})