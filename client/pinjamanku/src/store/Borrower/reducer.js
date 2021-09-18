import {
    BORROWER_LOADING,
    BORROWER_SUCCESS,
    BORROWER_ERROR,
    BORROWER_BY_ID_LOADING,
    BORROWER_BY_ID_SUCCESS,
    BORROWER_BY_ID_ERROR,
    ADD_BORROWER_LOADING,
    ADD_BORROWER_SUCCESS,
    ADD_BORROWER_ERROR,
    EDIT_BORROWER_LOADING,
    EDIT_BORROWER_SUCCESS,
    EDIT_BORROWER_ERROR,
    DELETE_BORROWER_LOADING,
    DELETE_BORROWER_SUCCESS,
    DELETE_BORROWER_ERROR,
} from './actionType'

const initialState = {
    isBorrowerLoading: false,
    isBorrowerSucces: [],
    isBorrowerError: null
}

function borrowerReducer(state = initialState, action) {
    switch (action.type) {
        case BORROWER_LOADING:
            return {
                ...state,
                isBorrowerLoading: action.payload
            }

        case BORROWER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isBorrowerSucces: action.payload
            }

        case BORROWER_ERROR:
            return {
                ...state,
                isBorrowerError: action.payload
            }

        default:
            return state
    }
}

export default borrowerReducer