import React from 'react';
import PropTypes from 'prop-types';

import './Search.css';

export default class Search extends React.Component {
  state = { 
    currencyCode: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getCurrency(this.state.currencyCode.toLowerCase());
  }
  
  render() {
    const { searchError, searchErrorMessage } = this.props;
    const { currencyCode } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-8 Form'}>
          <input className={`form-control  ${searchError ? 'is-invalid' : ''}`}
            type="text" 
            value={currencyCode}
            onChange={event => this.setState({ currencyCode: event.target.value })}
            placeholder="Wpisz kod waluty"
          />
          {searchError ?
            <p style={{ color: 'red' }}>{searchErrorMessage}</p> :
            ''
          }
        </div>
        <button type="submit" className={'btn btn-primary col-4 SearchButton'}>Szukaj</button>
      </form>
    );
  }
};

Search.propTypes = {
  getCurrency: PropTypes.func,
  searchError: PropTypes.bool,
  searchErrorMessage: PropTypes.string,
};