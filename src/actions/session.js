import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function logInEmailBackend(text) {
  return dispatch => {
    dispatch(loginRequest());
    return fetch(cons.APIEndpoints.LOGIN_EMAIL, {
    	method: 'post',
    	headers: {
    		'Accept': 'application/vnd.blabla-clone-v1+json',
    		'Content-Type': 'application/json'
    	},
		  body: JSON.stringify({
		  	'email': text["email"],
		  	'password': text["password"]
		  })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(loginSuccess(json)))
    .catch(errors => dispatch(loginFailure(errors)))
  };
}

export function logInFbBackend(text) {
  console.log('logInFbBackend', text);
  return dispatch => {
    dispatch(loginRequest());
    return fetch(cons.APIEndpoints.LOGIN_FB, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'uid': text['id'],
        'provider': 'facebook',
        'email': text['email'],
        'first_name': text['first_name'],
        'last_name': text['last_name'],
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(loginSuccess(json)))
    .catch(errors => dispatch(loginFailure(errors)))
  };
}

export function logout(text) {
  return dispatch => {
    dispatch(logoutRequest());
    return fetch(cons.APIEndpoints.LOGOUT, {
      method: 'delete',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': text['email'],
        'X-User-Token': text['accessToken']
      },
      body: JSON.stringify({
        'access_token': text['accessToken'],
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(logoutSuccess(json)))
    .catch(errors => dispatch(logoutFailure(errors)))
  };
}

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST,
  }
}

export function loginSuccess(json) {
  console.log('json', json);
	return {
    type: types.LOGIN_SUCCESS,
    email: json['email'],
    accessToken: json['access_token']
  }
}

export function loginFailure(errors) {
  return {
    type: types.LOGIN_FAILURE,
    errors: errors
  }
}

export function logoutRequest() {
  return {
    type: types.LOGOUT_REQUEST,
  }
}

export function logoutSuccess(json) {
  console.log('json', json);
  return {
    type: types.LOGOUT_SUCCESS,
  }
}

export function logoutFailure(errors) {
  return {
    type: types.LOGOUT_FAILURE,
    errors: errors
  }
}
