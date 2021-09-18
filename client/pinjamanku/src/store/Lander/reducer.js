import {
    LANDER_LOADING,
    LANDER_SUCCESS,
    LANDER_ERROR,
    LANDER_BY_ID_LOADING,
    LANDER_BY_ID_SUCCESS,
    LANDER_BY_ID_ERROR,
    ADD_LANDER_LOADING,
    ADD_LANDER_SUCCESS,
    ADD_LANDER_ERROR,
    EDIT_LANDER_LOADING,
    EDIT_LANDER_SUCCESS,
    EDIT_LANDER_ERROR,
    DELETE_LANDER_LOADING,
    DELETE_LANDER_SUCCESS,
    DELETE_LANDER_ERROR,
} from './actionType'
const initialState = {
    isLanderLoading: false,
    isLanderSucces: [],
    isLanderError: null
}
function landerReducer(state = initialState, action) {
    switch (action.type) {
        case LANDER_LOADING:
            return {
                ...state,
                isLanderLoading: action.payload
            }

        case LANDER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isLanderSucces: action.payload
            }

        case LANDER_ERROR:
            return {
                ...state,
                isLanderError: action.payload
            }

        default:
            return state
    }
}

export default landerReducer