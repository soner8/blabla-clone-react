import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchUsers() {
  return dispatch => {
    dispatch(usersRequest());
    return fetch(cons.APIEndpoints.USERS, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(usersSuccess(json)))
    .catch(errors => dispatch(usersFailure(errors)))
  };
}

export function fetchUser(userId) {
  return dispatch => {
    dispatch(userRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + userId, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userSuccess(json)))
    .catch(errors => dispatch(userFailure(errors)))
  };
}

export function createUser(user) {
  return dispatch => {
    dispatch(userCreateRequest());
    return fetch(cons.APIEndpoints.USERS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': user["first_name"],
        'last_name':  user["last_name"],
        'email':      user["email"],
        'password':   user["password"],
        'password_confirmation': user["passwordConfirmation"]
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userCreateSuccess(json)))
    .catch(errors => dispatch(userCreateFailure(errors)))
  };
}

export function updateUser(user, session) {
  // console.log('updateUser', user, session)
  // console.log('path', cons.APIEndpoints.USERS + '/' + user.id)
  return dispatch => {
    // dispatch(userupdateRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + user.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: JSON.stringify({
        'id':         user["id"],
        'first_name': user["first_name"],
        'last_name':  user["last_name"],
        'email':      user["email"],
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userUpdateSuccess(json, session)))
    .catch(errors => dispatch(userUpdateFailure(errors)))
  };
}

export function usersRequest() {
  return {
    type: types.USERS_REQUEST,
  };
}

export function usersSuccess(json) {
  // console.log('usersSuccess json', json);
  return {
    type: types.USERS_SUCCESS,
    users: json
  }
}

export function usersFailure(errors) {
  return {
    type: types.USERS_FAILURE,
    errors: errors
  }
}

export function userRequest() {
  return {
    type: types.USER_REQUEST,
  };
}

export function userSuccess(json) {
  // console.log('userSuccess json', json);
  return {
    type: types.USER_SUCCESS,
    user: json
  }
}

export function userFailure(errors) {
  return {
    type: types.USER_FAILURE,
    errors: errors
  }
}


export function userCreateRequest() {
  return {
    type: types.USER_CREATE_REQUEST,
  };
}

export function userCreateSuccess(json) {
  // console.log('userSuccess json', json);
  return {
    type: types.USER_CREATE_SUCCESS,
    user: json
  }
}

export function userCreateFailure(errors) {
  return {
    type: types.USER_CREATE_FAILURE,
    errors: errors
  }
}


export function userUpdateSuccess(json, session) {
  // console.log('userSuccess json', json);
  return {
    type: types.USER_UPDATE_SUCCESS,
    user: json,
    session: session
  }
}

export function userUpdateFailure(errors) {
  return {
    type: types.USER_UPDATE_FAILURE,
    errors: errors
  }
}
