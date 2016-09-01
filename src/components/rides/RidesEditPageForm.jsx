import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux';
import { reduxForm, Field }   from 'redux-form'
import { renderTextField }    from '../shared/RenderTextField'
import { renderGeoTextField } from '../shared/RenderGeoTextField'
import { renderSelectField }  from '../shared/RenderSelectField'
import DatePicker             from '../inputs/DatePicker'
import RideValidator          from './RideValidator'
import MenuItem               from 'material-ui/MenuItem'

class RidesEditPageForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, submitting, ridesOptions } = this.props

    var currencies = []
    var cars = []
    if (ridesOptions) {
      for (var i = 0; i < ridesOptions.currencies.length; i++) {
        currencies.push(<MenuItem value={ridesOptions.currencies[i]} key={'option-' + i} primaryText={ridesOptions.currencies[i]}/>);
      }
      for (var i = 0; i < ridesOptions.cars.length; i++) {
        cars.push(<MenuItem value={ridesOptions.cars[i].id} key={'car-' + i} primaryText={ridesOptions.cars[i].name}/>);
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field name="start_city" type="text" component={renderTextField} label="Start city"/>
        <Field name="destination_city" type="text" component={renderTextField} label="Destination name"/>
        <Field name="start_date"
          component={DatePicker}
          floatingLabelText="Start date"
          className='date-input'
          minDate={new Date()} />
        <Field name="car_id" component={renderSelectField} label="Car">
          {_.map(cars, (n) => n)}
        </Field>
        <Field name="places" type="text" component={renderTextField} label="Seats"/>
        <Field name="price" type="text" component={renderTextField} label="Price"/>
        <Field name="currency" component={renderSelectField} label="Currency">
          {_.map(currencies, (n) => n)}
        </Field>
        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    );
  }
}

RidesEditPageForm = reduxForm({
  form: 'RidesEditPageForm',
  validate: RideValidator,
})(RidesEditPageForm)

RidesEditPageForm = connect(
  state => ({
    initialValues: state.ride.ride
  })
)(RidesEditPageForm)

export default RidesEditPageForm
