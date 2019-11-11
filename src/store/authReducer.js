//////////////////////////////////////////////////////////   DEPENDENCIES   ////////////////////////////////////////////

import { authAPI } from "../dal/serverAPI"
import { message } from "antd"

//////////////////////////////////////////////////////////   NAME ACTION TYPES   ///////////////////////////////////////

const SET_AUTH_USER = 'auth/SET_AUTH_USER'
const UNSET_AUTH_USER = 'auth/UNSET_AUTH_USER'
const IS_LOADING = 'auth/IS_LOADING'

//////////////////////////////////////////////////////////   INITIAL STATE   ///////////////////////////////////////////

const initialState = {
    id: null,
    token: null,
    isAuth: false,
    isLoading: false,
}

//////////////////////////////////////////////////////////   REDUCERS   ////////////////////////////////////////////////

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                token: action.token,
                isAuth: true
            }
        case UNSET_AUTH_USER:
            return { ...initialState }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.bool
            }
        default:
            return state
    }
}

//////////////////////////////////////////////////////////   ACTION CREATORS   /////////////////////////////////////////

export const setAuthUser = (token) => ({ type: SET_AUTH_USER, token })
export const unsetAuthUser = () => ({ type: UNSET_AUTH_USER })
export const isLoadingToggleAuth = (bool) => ({ type: IS_LOADING, bool })

//////////////////////////////////////////////////////////   THUNK CREATORS   //////////////////////////////////////////

export const login = ({ userName, password }) => async (dispatch) => {
    dispatch(isLoadingToggleAuth(true))
    const data = await authAPI.login(userName, password)
    if (data.status === 'ok') {
        console.log('CLIENT LOGIN OK')
        message.success('Hello admin!!')
        dispatch(setAuthUser(data.message.token))
        dispatch(isLoadingToggleAuth(false))
    } else {
        console.log('CLIENT LOGIN ERROR')
        message.error('Login or password is incorrect')
        dispatch(isLoadingToggleAuth(false))
    }
}
export const logout = () => async (dispatch) => {
    dispatch(isLoadingToggleAuth(true))
    const data = await authAPI.logout()
    if (data.resCode === 0) {
        console.log('CLIENT LOGOUT OK')
        message.success('Goodbuy!!')
        dispatch(unsetAuthUser())
        dispatch(isLoadingToggleAuth(false))
    } else {
        console.log('CLIENT LOGOUT ERROR')
        dispatch(isLoadingToggleAuth(false))
    }
}