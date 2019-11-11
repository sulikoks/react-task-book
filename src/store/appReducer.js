
const INIT_SUCCESS = 'app/INIT_SUCCESS'

const initState = {
    isInit: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                isInit: true
            }
        default:
            return state
    }
}

export const initSuccess = () => ({type: INIT_SUCCESS})

export const initApp = () => (dispatch) => {
    ////dispatch
    ////dispatch
    dispatch(initSuccess())
}