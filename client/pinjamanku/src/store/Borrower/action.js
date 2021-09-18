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

export function getAllBorrowerLoading(payload) {
    return {
        type: BORROWER_LOADING,
        payload
    }
}

export function getAllBorrowerSuccess(payload) {
    return {
        type: BORROWER_SUCCESS,
        payload
    }
}

export function getAllBorrowerError(payload) {
    return {
        type: BORROWER_ERROR,
        payload
    }
}

export function fetchBorrower() {
    return async function (dispatch, getState) {
        try {
            dispatch(getAllBorrowerLoading(true))
            fetch('http://localhost:3000/borrower')
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    // console.log(data, '========');
                    dispatch(getAllBorrowerSuccess(data))
                })
                .catch(err => {
                    dispatch(getAllBorrowerError(err))
                })
                .finally(() => dispatch(getAllBorrowerLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}

export function LoginBorrower(payload) {
    const {email, password} = payload
    return async function (dispatch, getState) {
        try {
            dispatch(getAllBorrowerLoading(true))
            return fetch('http://localhost:3000/borrower/login',  {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({email,password}), 
                method: "POST"}
                )
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    console.log(data, '========Success_LOGIN');
                    return data
                })
                .catch(err => {
                    console.log(err, '========Err_LOGIN');
                    return data
                })
                // .finally(() => dispatch(getAllBorrowerLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}
export function RegisterBorrower(payload) {
    const {email, password, bank, norek } = payload
    return async function (dispatch, getState) {
        try {
            dispatch(getAllBorrowerLoading(true))
            return fetch('http://localhost:3000/borrower/register',  {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({email,password, bank,norek}), 
                method: "POST"}
                )
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    console.log(data, '========Success_LOGIN');
                    return data
                })
                .catch(err => {
                    console.log(err, '========Err_LOGIN');
                    return data
                })
                // .finally(() => dispatch(getAllBorrowerLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}