import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchRides(session) {
  return dispatch => {
    dispatch(ridesRequest());
    return fetch(cons.APIEndpoints.RIDES, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(ridesSuccess(json)))
    .catch(errors => dispatch(ridesFailure(errors)))
  };
}

export function fetchRidesAsDriver(driverId) {
  return dispatch => {
    dispatch(ridesAsDriverRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + driverId + '/rides_as_driver', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(ridesAsDriverSuccess(json)))
    .catch(errors => dispatch(ridesAsDriverFailure(errors)))
  };
}

export function fetchRide(rideId) {
  return dispatch => {
    dispatch(rideRequest());
    return fetch(cons.APIEndpoints.RIDES + '/' + rideId, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideSuccess(json)))
    .catch(errors => dispatch(rideFailure(errors)))
  };
}

export function fetchRidesOptions(session) {
  console.log('session', session)
  return dispatch => {
    dispatch(ridesOptionsRequest());
    return fetch(cons.APIEndpoints.RIDES + '/options', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(ridesOptionsSuccess(json)))
    .catch(errors => dispatch(ridesOptionsFailure(errors)))
  };
}

export function createRide(ride, session) {
  return dispatch => {
    dispatch(rideCreateRequest());
    return fetch(cons.APIEndpoints.RIDES, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: JSON.stringify({
        'start_city':           ride["start_city"],
        'start_city_lat':       ride["start_city_lat"],
        'start_city_lng':       ride["start_city_lng"],
        'destination_city':     ride["destination_city"],
        'destination_city_lat': ride["destination_city_lat"],
        'destination_city_lng': ride["destination_city_lng"],
        'seats':                ride["seats"],
        'start_date':           ride["start_date"],
        'car_id':               ride["car_id"],
        'price':                ride["price"],
        'currency':             ride["currency"],
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideCreateSuccess(json)))
    .catch(errors => dispatch(rideCreateFailure(errors)))
  };
}

export function updateRide(ride, ride_photo, session) {
  return dispatch => {
    dispatch(rideUpdateRequest());
    return fetch(cons.APIEndpoints.RIDES + '/' + ride.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: JSON.stringify({
        'id':       ride["id"],
        'brand':    ride["brand"],
        'model':    ride["model"],
        'production_year': ride["production_year"],
        'places':   ride["places"],
        'color':    ride["color"],
        'comfort':  ride["comfort"],
        'category': ride["category"],
        'ride_photo': ride_photo
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideUpdateSuccess(json)))
    .catch(errors => dispatch(rideUpdateFailure(errors)))
  };
}

export function ridesRequest() {
  return {
    type: types.RIDES_REQUEST,
  };
}

export function ridesSuccess(json) {
  return {
    type: types.RIDES_SUCCESS,
    rides: json
  }
}

export function ridesFailure(errors) {
  return {
    type: types.RIDES_FAILURE,
    errors: errors
  }
}

export function rideRequest() {
  return {
    type: types.RIDE_REQUEST,
  };
}

export function rideSuccess(json) {
  return {
    type: types.RIDE_SUCCESS,
    ride: json
  }
}

export function rideFailure(errors) {
  return {
    type: types.RIDE_FAILURE,
    errors: errors
  }
}

export function rideCreateRequest() {
  return {
    type: types.RIDE_CREATE_REQUEST,
  };
}

export function rideCreateSuccess(json) {
  return {
    type: types.RIDE_CREATE_SUCCESS,
    ride: json
  }
}

export function rideCreateFailure(errors) {
  return {
    type: types.RIDE_CREATE_FAILURE,
    errors: errors
  }
}

export function rideUpdateRequest() {
  return {
    type: types.RIDE_UPDATE_REQUEST,
  };
}

export function rideUpdateSuccess(json) {
  return {
    type: types.RIDE_UPDATE_SUCCESS,
    ride: json
  }
}

export function rideUpdateFailure(errors) {
  return {
    type: types.RIDE_UPDATE_FAILURE,
    errors: errors
  }
}

export function ridesOptionsRequest() {
  return {
    type: types.RIDE_OPTIONS_REQUEST,
  };
}

export function ridesOptionsSuccess(json) {
  return {
    type: types.RIDE_OPTIONS_SUCCESS,
    ridesOptions: json
  }
}

export function ridesOptionsFailure(errors) {
  return {
    type: types.RIDE_OPTIONS_FAILURE,
    errors: errors
  }
}


export function ridesAsDriverRequest() {
  return {
    type: types.RIDES_DRIVER_REQUEST,
  };
}

export function ridesAsDriverSuccess(json) {
  return {
    type: types.RIDES_DRIVER_SUCCESS,
    rides: json
  }
}

export function ridesAsDriverFailure(errors) {
  return {
    type: types.RIDES_DRIVER_FAILURE,
    errors: errors
  }
}
