import React from 'react';

import './Search.css';

export default class Search extends React.Component {
  state = { 
    currencyCode: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchByCode(this.state.currencyCode.toLowerCase());
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-8 Form'}>
          <input className={`form-control  ${this.props.inputError ? 'is-invalid' : ''}`}
            type="text" 
            value={this.state.currencyCode}
            onChange={event => this.setState({ currencyCode: event.target.value })}
            placeholder="Wpisz kod waluty"
          />
          {this.props.inputError ?
            <p style={{ color: 'red' }}>{this.props.errorMessage}</p> :
            ''
          }
        </div>
        <button type="submit" className={'btn btn-primary col-4 SearchButton'}>Szukaj</button>
      </form>
    );
  }
}