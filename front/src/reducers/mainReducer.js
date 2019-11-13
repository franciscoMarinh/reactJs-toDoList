import { SET_TOKEN,
    SET_USER_DATA,
    SET_TASKS_DATA,
    UPDATE_TASKS_DATA,
    TOGGLE_FORM_TASK,
    FORM_TASKDATA,
     } from '../actions/appActions'

const initialState = {
    token: '',
    userTasks: [],
    userData: [],
    updateTasks: null,
    enableForm: false,
    formTaskData: {
        method: "post"
    }
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return{
                ...state,
                token: action.token
            }
        case SET_USER_DATA:
            return{
                ...state,
                userData: action.userData
            }
        case SET_TASKS_DATA:
            return{
                ...state,
                userTasks: action.userTasks
            }
        case UPDATE_TASKS_DATA:
            return{
                ...state,
                updateTasks: action.updateTasks
            }
        case TOGGLE_FORM_TASK:
            return{
                ...state,
                enableForm: action.enableForm
            }
        case FORM_TASKDATA:
            return{
                ...state,
                formTaskData: action.formTaskData
            }
        default:
            return state
    }
}