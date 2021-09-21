import {
    ALL_LOAN_LOADING,
    ALL_LOAN_SUCCESS,
    ALL_LOAN_ERROR,
    BORROWER_PAY_LOADING,
    BORROWER_PAY_SUCCESS,
    BORROWER_PAY_ERROR,
    LANDER_INVEST_LOADING,
    LANDER_INVEST_SUCCESS,
    LANDER_INVEST_ERROR,
    BORROWER_AMOUNT_LOADING,
    BORROWER_AMOUNT_SUCCESS,
    BORROWER_AMOUNT_ERROR,
    LANDER_GET_AMOUNT_LOADING,
    LANDER_GET_AMOUNT_SUCCESS,
    LANDER_GET_AMOUNT_ERROR,
} from './actionType'

const initialState = {
    isLoanLoading: false,
    isLoanSuccess: [],
    isLoanError: null,
    isBorrowerPayLoading: false,
    isBorrowerPaySuccess: [],
    isBorrowerPayError: null,
    isLanderInvestLoading: false,
    isLanderInvestSuccess: [],
    isLanderInvestError: null,
    isBorrowerAmountLoading: false,
    isBorrowerAmountSucces: [],
    isBorrowerAmountError: null,
    isLanderGetAmountLoading: false,
    isLanderGetAmountSucces: [],
    isLanderGetAmountError: null
}

function pinjamanReducer(state = initialState, action) {
    switch (action.type) {
        case ALL_LOAN_LOADING:
            return {
                ...state,
                isLoanLoading: action.payload
            }

        case ALL_LOAN_SUCCESS:
            console.log(action.payload, 'mana');
            return {
                ...state,
                isLoanSuccess: action.payload
            }

        case ALL_LOAN_ERROR:
            return {
                ...state,
                isLoanError: action.payload
            }
        case BORROWER_PAY_LOADING:
            return {
                ...state,
                isBorrowerPayLoading: action.payload
            }

        case BORROWER_PAY_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isBorrowerPaySuccess: action.payload
            }

        case BORROWER_PAY_ERROR:
            return {
                ...state,
                isBorrowerPayError: action.payload
            }

        case LANDER_INVEST_LOADING:
            return {
                ...state,
                isLanderInvestLoading: action.payload
            }

        case LANDER_INVEST_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isLanderInvestSuccess: action.payload
            }

        case LANDER_INVEST_ERROR:
            return {
                ...state,
                isLanderInvestError: action.payload
            }

        case BORROWER_AMOUNT_LOADING:
            return {
                ...state,
                isBorrowerAmountLoading: action.payload
            }

        case BORROWER_AMOUNT_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isBorrowerAmountSuccess: action.payload
            }

        case BORROWER_AMOUNT_ERROR:
            return {
                ...state,
                isBorrowerAmountError: action.payload
            }

        case LANDER_GET_AMOUNT_LOADING:
            return {
                ...state,
                isLanderGetAmountLoading: action.payload
            }

        case LANDER_GET_AMOUNT_SUCCESS:
            // console.log(action.payload, 'mana');
            return {
                ...state,
                isLanderGetAmountSuccess: action.payload
            }

        case LANDER_GET_AMOUNT_ERROR:
            return {
                ...state,
                isLanderGetAmountError: action.payload
            }
        default:
            return state
    }
}

export default pinjamanReducer