import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import LoginFbPage           from '../../components/session/LoginFbPage'
import LoginEmailPage        from '../../components/session/LoginEmailPage'
import styles                from '../../stylesheets/session/Login'
import * as actions          from '../../actions/session';

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className='show-grid'>
        <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <LoginFbPage
            onDataReceive={text =>
              dispatch(actions.logInFbBackend(text))
            } />
          <LoginEmailPage
            onAddClick={text =>
              dispatch(actions.logInEmailBackend(text))
            } />
        </Bootstrap.Col>
      </div>
    )
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    session: {
      isFetching: state.session['isFetching'],
      isLoggedIn: state.session['isLoggedIn'],
      user: {
        access_token: state.session.user['access_token'],
        email:        state.session.user['email'],
        permission:   state.session.user['permission']
      }
    }
  };
}

export default connect(select)(LoginPage);
