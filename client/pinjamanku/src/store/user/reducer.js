import {
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_LOADING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    USER_LOADING,
    USER_SUCCESS,
    USER_ERROR,
    USER_BY_ID_LOADING,
    USER_BY_ID_SUCCESS,
    USER_BY_ID_ERROR,
    EDIT_USER_LOADING,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    DELETE_USER_LOADING,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
} from './actionType'

const initialState = {
    isRegisterUserLoading: false,
    isRegisterUserSuccess: [],
    isRegisterUserError: null,
    isLoginUserLoading: false,
    isLoginUserSucces: [],
    isLoginUserError: null,
    isUserLoading: false,
    isUserSuccess: [],
    isUserError: null,
    isUserByIdLoading: false,
    isUserByIdSucces: [],
    isUserByIdError: null,
    isUserUpdateLoading: false,
    isUserUpdateSuccess: [],
    isUserUpdateError: null,
    isUserDeleteLoading: false,
    isUserDeleteSuccess: [],
    isUserDeleteError: null
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER_LOADING:
            return {
                ...state,
                isRegisterUserLoading: action.payload
            }

        case REGISTER_USER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isRegisterUserSuccess: action.payload
            }

        case REGISTER_USER_ERROR:
            return {
                ...state,
                isRegisterUserError: action.payload
            }

        case LOGIN_USER_LOADING:
            return {
                ...state,
                isLoginUserLoading: action.payload
            }

        case LOGIN_USER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isLoginUserSucces: action.payload
            }

        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoginUserError: action.payload
            }

        case USER_LOADING:
            return {
                ...state,
                isUserLoading: action.payload
            }

        case USER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isUserSuccess: action.payload
            }

        case USER_ERROR:
            return {
                ...state,
                isUserError: action.payload
            }

        case USER_BY_ID_LOADING:
            return {
                ...state,
                isUserByIdLoading: action.payload
            }

        case USER_BY_ID_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isUserByIdSucces: action.payload
            }

        case USER_BY_ID_ERROR:
            return {
                ...state,
                isUserByIdError: action.payload
            }

        case EDIT_USER_LOADING:
            return {
                ...state,
                isUserUpdateLoading: action.payload
            }

        case EDIT_USER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isUserUpdateSuccess: action.payload
            }

        case EDIT_USER_ERROR:
            return {
                ...state,
                isUserUpdateError: action.payload
            }

        case DELETE_USER_LOADING:
            return {
                ...state,
                isUserDeleteLoading: action.payload
            }

        case DELETE_USER_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isUserDeleteSuccess: action.payload
            }

        case DELETE_USER_ERROR:
            return {
                ...state,
                isUserDeleteError: action.payload
            }

        default:
            return state
    }
}

export default userReducer