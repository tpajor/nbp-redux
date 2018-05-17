import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

export default class Input extends React.Component {
  state = { 
    numberOfData: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = parseInt(this.state.numberOfData, 10);
    this.props.getInputedNumberOfLastRates(value, this.props.currencyCodeToViewInDetail);
  };

  render() {
    const { numberOfData } = this.state;
    const { detailsInputError, detailsInputErrorMessage, currencyCodeToViewInDetail, input } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-2 Input'}>
          <input className="form-control-plaintext"
            type="text" 
            value={currencyCodeToViewInDetail.toUpperCase()}
            readOnly
          />
        </div>
        <div className={'form-group col-6 Form'}>
          <input className={`form-control ${detailsInputError ? 'is-invalid': ''}`}
            type="text" 
            value={currencyCodeToViewInDetail ? numberOfData : ''}
            onChange={event => this.setState({ numberOfData: event.target.value })}
            placeholder="Wpisz liczbę ostatnich kursów"
          />
          {(detailsInputError) ?
            <p style={{color: 'red'}}>{detailsInputErrorMessage}</p> :
            ''
          }
        </div>
        <button type="submit" className={'btn btn-primary col-4 InputButton'} disabled={currencyCodeToViewInDetail === ''}>Pokaż</button>
      </form> 
    );
  }
};

Input.propTypes = {
  currencyCodeToViewInDetail: PropTypes.string,
  getInputedNumberOfLastRates: PropTypes.func,
  detailsInputError: PropTypes.bool,
  detailsInputErrorMessage: PropTypes.string,
};