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

export function getAllLoanLoading(payload) {
    return {
        type: ALL_LOAN_LOADING,
        payload
    }
}

export function getAllLoanSuccess(payload) {
    return {
        type: ALL_LOAN_SUCCESS,
        payload
    }
}

export function getAllLoanError(payload) {
    return {
        type: ALL_LOAN_ERROR,
        payload
    }
}

export function fetchLoan(id) {
    return async function (dispatch, getState) {
        try {
            dispatch(getAllLoanLoading(true))
            fetch('http://localhost:3000/loans')
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    dispatch(getAllLoanSuccess(data))
                })
                .catch(err => {
                    dispatch(getAllLoanError(err))
                })
                .finally(() => dispatch(getAllLoanLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function getLanderInvestLoading(payload) {
    return {
        type: LANDER_INVEST_LOADING,
        payload
    }
}

export function getLanderInvestSuccess(payload) {
    return {
        type: LANDER_INVEST_SUCCESS,
        payload
    }
}

export function getLanderInvestError(payload) {
    return {
        type: LANDER_INVEST_ERROR,
        payload
    }
}

export function landerInvest(payload) {
    return async function (dispatch, getState) {
        console.log(payload);
        try {
            dispatch(getLanderInvestLoading(true))
            fetch('http://localhost:3000/loans/invoice/lender', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "access_token": localStorage.access_token
                },
                body: JSON.stringify(payload),
                method: "POST"
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    console.log("data==============", data)
                    dispatch(getLanderInvestSuccess(data))
                })
                .catch(err => {
                    dispatch(getLanderInvestError(err))
                })
                .finally(() => dispatch(getLanderInvestLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function getBorrowerAmountLoading(payload) {
    return {
        type: BORROWER_AMOUNT_LOADING,
        payload
    }
}

export function getBorrowerAmountSuccess(payload) {
    return {
        type: BORROWER_AMOUNT_SUCCESS,
        payload
    }
}

export function getBorrowerAmountError(payload) {
    return {
        type: BORROWER_AMOUNT_ERROR,
        payload
    }
}

export function borrowerAmount(id) {
    return async function (dispatch, getState) {
        try {
            dispatch(getBorrowerPayLoading(true))
            fetch('http://localhost:3000/loans/disburse/loan', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loanID: id }),
                method: "POST"
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    dispatch(getBorrowerAmountSuccess(data))
                })
                .catch(err => {
                    dispatch(getBorrowerAmountError(err))
                })
                .finally(() => dispatch(getBorrowerAmountLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function getBorrowerPayLoading(payload) {
    return {
        type: BORROWER_PAY_LOADING,
        payload
    }
}

export function getBorrowerPaySuccess(payload) {
    return {
        type: BORROWER_PAY_SUCCESS,
        payload
    }
}

export function getBorrowerPayError(payload) {
    return {
        type: BORROWER_PAY_ERROR,
        payload
    }
}

export function borrowerPay(id) {
    return async function (dispatch, getState) {
        try {
            dispatch(getBorrowerPayLoading(true))
            fetch('http://localhost:3000/loans/invoice/borrower', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
                method: "POST"
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    dispatch(getBorrowerPaySuccess(data))
                })
                .catch(err => {
                    dispatch(getBorrowerPayError(err))
                })
                .finally(() => dispatch(getBorrowerPayLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function getLenderGetAmountLoading(payload) {
    return {
        type: LANDER_GET_AMOUNT_LOADING,
        payload
    }
}

export function getLenderGetAmountSuccess(payload) {
    return {
        type: LANDER_GET_AMOUNT_SUCCESS,
        payload
    }
}

export function getLenderGetAmountError(payload) {
    return {
        type: LANDER_GET_AMOUNT_ERROR,
        payload
    }
}

export function landerGetAmount(data) {
    return async function (dispatch, getState) {
        try {
            dispatch(getLenderGetAmountLoading(true))
            fetch('http://localhost:3000/loans/disburse/withdrawal', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                method: "POST"
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    // console.log(data, '========');
                    dispatch(getLenderGetAmountSuccess(data))
                })
                .catch(err => {
                    dispatch(getLenderGetAmountError(err))
                })
                .finally(() => dispatch(getLenderGetAmountLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}
