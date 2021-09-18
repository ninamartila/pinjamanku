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

export function getAllLanderLoading(payload) {
    return {
        type: LANDER_LOADING,
        payload
    }
}

export function getAllLanderSuccess(payload) {
    return {
        type: LANDER_SUCCESS,
        payload
    }
}

export function getAllLanderError(payload) {
    return {
        type: LANDER_ERROR,
        payload
    }
}

export function fetchLander() {
    return async function (dispatch, getState) {
        try {
            dispatch(getAllLanderLoading(true))
            fetch('http://localhost:3000/lander')
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return Promise.reject('something went wrong')
                    }
                })
                .then((data) => {
                    // console.log(data, '========');
                    dispatch(getAllLanderSuccess(data))
                })
                .catch(err => {
                    dispatch(getAllLanderError(err))
                })
                .finally(() => dispatch(getAllLanderLoading(false)))
        } catch (err) {
            console.log(err);
        }
    }
}
