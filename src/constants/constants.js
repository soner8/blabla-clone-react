var APIRoot = 'http://localhost:3000';

module.exports = {
  APIEndpoints: {
    USERS:         APIRoot + '/api/users',
    CARS:          APIRoot + '/api/cars',
    RIDES:         APIRoot + '/api/rides',
    RIDE_REQUESTS: APIRoot + '/api/ride_requests',
    LOGOUT:        APIRoot + '/api/sessions',
    LOGIN_EMAIL:   APIRoot + '/api/sessions/login',
    LOGIN_FB:      APIRoot + '/api/sessions/oath_login'
  },

  Permissions: {
    'USER': 'user',
    'ADMIN': 'admin',
    'PUBLIC': 'public'
  }
};
