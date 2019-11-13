import {
    SET_TOKEN, SET_USER_DATA, 
    SET_TASKS_DATA, 
    UPDATE_TASKS_DATA, 
    TOGGLE_FORM_TASK,
    UPDATE_TASKDATA,
    FORM_TASKDATA
} from './appActions'

export const setToken = value => ({
    type: SET_TOKEN,
    token: value
})

export const setUserData = value => ({
    type: SET_USER_DATA,
    userData: value
})

export const setUserTasks = value => ({
    type: SET_TASKS_DATA,
    userTasks: value
})

export const updateUserTasks = value => ({
    type: UPDATE_TASKS_DATA,
    updateTasks: value
})

export const toggleFormTask = value => ({
    type: TOGGLE_FORM_TASK,
    enableForm: value
})

export const updateTaskData = value => ({
    type: UPDATE_TASKDATA,
    taskData: value
})
export const updateFormTaskData = value => ({
    type: FORM_TASKDATA,
    formTaskData: value
})