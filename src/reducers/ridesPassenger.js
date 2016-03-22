import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  rides: undefined
}

export default function ridesPassenger(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_PASSENGER_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDES_PASSENGER_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      rides: action.rides
    });
  default:
    return state;
  }
}