import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import _                     from 'underscore';

import CarsEditPageForm      from '../../../components/users/cars/CarsEditPageForm'
import styles                from '../../../stylesheets/users/Users'
import * as actions          from '../../../actions/cars';

export default class CarsEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var carId = this.props.params.carId
    const { dispatch, car } = this.props;
    dispatch(actions.fetchCarsOptions());
    if (carId) {
      dispatch(actions.fetchCar(carId))
    }
  }

  render() {
    const { dispatch, car, carsOptions, session } = this.props;

    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <CarsEditPageForm
            car={car}
            carsOptions={carsOptions}
            onAddClick={car =>
              dispatch(actions.updateCar(car, session))
            } />
        </Bootstrap.Row>
      </div>
    )
  }
}

CarsEditPage.PropTypes = {
  car: PropTypes.array.isRequired
}

function select(state) {
  return {
    currentUserId: state.session.user.id,
    car:           state.car.car,
    carsOptions:   state.carsOptions.carsOptions,
    session:       state.session.user
  };
}

export default connect(select)(CarsEditPage);
