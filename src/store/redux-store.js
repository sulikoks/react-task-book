import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from "redux-thunk"

import {reducer as formReducer} from "redux-form"
import appReducer from "./appReducer"
import authReducer from './authReducer'
import tasksTabReducer from "./tasksTabReducer"



const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    tasksPage: tasksTabReducer,
    form: formReducer,
})

export default createStore(reducers, applyMiddleware(thunkMiddleware))