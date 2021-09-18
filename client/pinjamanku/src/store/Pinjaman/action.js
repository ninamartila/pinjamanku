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

export function getAllPinjamanLoading(payload) {
    return {
        type: PINJAMAN_LOADING,
        payload
    }
}

export function getAllPinjamanSuccess(payload) {
    return {
        type: PINJAMAN_SUCCESS,
        payload
    }
}

export function getAllPinjamanERError(payload) {
    return {
        type: PINJAMAN_ERROR,
        payload
    }
}

export function fetchPinjaman() {
    return async function (dispatch, getState) {
        try {
            dispatch(getAllPinjamanLoading(true))
            fetch('http://localhost:3000/pinjaman')
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    // console.log(data, '========');
                    dispatch(getAllPinjamanSuccess(data))
                })
                .catch(err => {
                    dispatch(getAllPinjamanError(err))
                })
                .finally(() => dispatch(getAllPinjamanLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}