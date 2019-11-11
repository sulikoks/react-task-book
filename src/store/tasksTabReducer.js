import { tasksAPI } from '../dal/serverAPI'
// import uuid from 'uuid'

const SET_TASKS = 'task/SET_TASKS'
const IS_LOADING = 'task/IS_LOADING'
const SET_CURRENT_PAGE = 'task/SET_CURRENT_PAGE'

const initState = {
    tasks: [],
    currentPage: 1,
    total: 1,
    isLoading: true,
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: [...action.tasks.tasks],
                total: action.tasks.total,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.bool
            }
        default:
            return state
    }
}

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page})
export const isLoadingToggle = (bool) => ({ type: IS_LOADING, bool })

export const getTasks = (currentPage, sortField, sortDirection) => async (dispatch) => {
    console.log('GET TASKS')
    dispatch(isLoadingToggle(true))
    const data = await tasksAPI.getTasks(currentPage, sortField, sortDirection)
    if (data.status === 'ok') {
        const tasks = data.message.tasks.map(task => ({ 
            ...task, 
            key: task.id, 
            status: task.status ? 'Ready' : 'Not Ready'
        }))
        dispatch(setTasks({ tasks, total: data.message.total_task_count }))
        dispatch(setCurrentPage(currentPage))
        dispatch(isLoadingToggle(false))
    }
}
export const updateTask = (task) => async (dispatch) => {
    console.log('UPDATE TASK')
    const data = await tasksAPI.putTasks(task)
    if (data.status === 'ok')
        console.log('CLIENT TASK UPDATED')
}
export const addTask = (task) => async (dispatch) => {
    console.log('ADD TASK')
    const data = await tasksAPI.addTask(task)
    if (data.status === 'ok')
        console.log('CLIENT TASK ADDED')
}