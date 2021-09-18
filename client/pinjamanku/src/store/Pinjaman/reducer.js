import {
    PINJAMAN_LOADING,
    PINJAMAN_SUCCESS,
    PINJAMAN_ERROR,
    PINJAMAN_BY_ID_LOADING,
    PINJAMAN_BY_ID_SUCCESS,
    PINJAMAN_BY_ID_ERROR,
    ADD_PINJAMAN_LOADING,
    ADD_PINJAMAN_SUCCESS,
    ADD_PINJAMAN_ERROR,
    EDIT_PINJAMAN_LOADING,
    EDIT_PINJAMAN_SUCCESS,
    EDIT_PINJAMAN_ERROR,
    DELETE_PINJAMAN_LOADING,
    DELETE_PINJAMAN_SUCCESS,
    DELETE_PINJAMAN_ERROR,
} from './actionType'
const initialState = {
    isPinjamanLoading: false,
    isPinjamanSucces: [],
    isPinjamanError: null
}

function pinjamanReducer(state = initialState, action) {
    switch (action.type) {
        case PINJAMAN_LOADING:
            return {
                ...state,
                isPinjamanLoading: action.payload
            }

        case PINJAMAN_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isPinjamanSucces: action.payload
            }

        case PINJAMAN_ERROR:
            return {
                ...state,
                isPinjamanError: action.payload
            }

        default:
            return state
    }
}

export default pinjamanReducer