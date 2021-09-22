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
} from "./actionType";

export function getRegisterUserLoading(payload) {
  return {
    type: REGISTER_USER_LOADING,
    payload,
  };
}

export function getRegisterUserSuccess(payload) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload,
  };
}

export function getRegisterUserError(payload) {
  return {
    type: REGISTER_USER_ERROR,
    payload,
  };
}

export function registerUser(payload) {
  return async function (dispatch, getState) {
    try {
      dispatch(getRegisterUserLoading(true));
      return fetch("http://localhost:3000/users/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          localStorage.setItem("dailyCo", data.dailyURL);
          dispatch(getRegisterUserSuccess(data));
          return data.dataValues;
        })
        .catch((err) => {
          console.log(err);
          dispatch(getRegisterUserError(err));
        })
        .finally(() => dispatch(getRegisterUserLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getLoginUserLoading(payload) {
  return {
    type: LOGIN_USER_LOADING,
    payload,
  };
}

export function getLoginUserSuccess(payload) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload,
  };
}

export function getLoginUserError(payload) {
  return {
    type: LOGIN_USER_ERROR,
    payload,
  };
}

export function loginUser(payload) {
  const { email, password } = payload;
  return async function (dispatch, getState) {
    try {
      dispatch(getLoginUserLoading(true));
      return fetch("http://localhost:3000/users/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("id", data.id);
          localStorage.setItem("role", data.role);
          localStorage.setItem("status", data.status);
          dispatch(getLoginUserSuccess(data));
          console.log(data);
          return data;
        })
        .catch((err) => {
          dispatch(getLoginUserError(err));
          return err;
        })
        .finally(() => dispatch(getAllUserLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getAllUserLoading(payload) {
  return {
    type: USER_LOADING,
    payload,
  };
}

export function getAllUserSuccess(payload) {
  return {
    type: USER_SUCCESS,
    payload,
  };
}

export function getAllUserError(payload) {
  return {
    type: USER_ERROR,
    payload,
  };
}

export function fetchUser() {
  return function (dispatch, getState) {
    try {
      fetch("http://localhost:3000/users")
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          dispatch(getAllUserSuccess(data));
        })
        .catch((err) => {
          dispatch(getAllUserError(err));
        })
        .finally(() => dispatch(getAllUserLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserByIdLoading(payload) {
  return {
    type: USER_BY_ID_LOADING,
    payload,
  };
}

export function getUserByIdSuccess(payload) {
  return {
    type: USER_BY_ID_SUCCESS,
    payload,
  };
}

export function getUserByIdError(payload) {
  return {
    type: USER_BY_ID_ERROR,
    payload,
  };
}

export function fetchUserById(id, role) {
  return async function (dispatch, getState) {
    try {
      dispatch(getUserByIdLoading(true));
      return fetch(`http://localhost:3000/users/${id}?role=${role}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          console.log(data, "========");
          dispatch(getUserByIdSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getUserByIdError(err));
        })
        .finally(() => dispatch(getUserByIdLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserUpdateLoading(payload) {
  return {
    type: EDIT_USER_LOADING,
    payload,
  };
}

export function getUserUpdateSuccess(payload) {
  return {
    type: EDIT_USER_SUCCESS,
    payload,
  };
}

export function getUserUpdateError(payload) {
  return {
    type: EDIT_USER_ERROR,
    payload,
  };
}

export function fetchUserUpdate(id, status) {
  return async function (dispatch, getState) {
    try {
      dispatch(getUserUpdateLoading(true));
      return fetch(`http://localhost:3000/users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
        method: "PUT",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          console.log(data, "========");
          dispatch(getUserUpdateSuccess(data));
        })
        .catch((err) => {
          dispatch(getUserUpdateError(err));
        })
        .finally(() => dispatch(getUserUpdateLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserDeleteLoading(payload) {
  return {
    type: DELETE_USER_LOADING,
    payload,
  };
}

export function getUserDeleteSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload,
  };
}

export function getUserDeleteError(payload) {
  return {
    type: DELETE_USER_ERROR,
    payload,
  };
}

export function fetchUserDelete(id, payload) {
  return async function (dispatch, getState) {
    try {
      dispatch(getUserDeleteLoading(true));
      return fetch(`http://localhost:3000/users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject("something went wrong");
          }
        })
        .then((data) => {
          // console.log(data, '========');
          dispatch(getUserDeleteSuccess(data));
        })
        .catch((err) => {
          dispatch(getUserDeleteError(err));
        })
        .finally(() => dispatch(getUserDeleteLoading(false)));
    } catch (err) {
      console.log(err);
    }
  };
}
