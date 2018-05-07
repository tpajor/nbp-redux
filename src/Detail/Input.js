import React from 'react';

import './Input.css';

export default class Input extends React.Component {
  state = { 
    numberOfData: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = parseInt(this.state.numberOfData, 10);
    this.props.getDataForChart(value);
  };

  render() {
    const { numberOfData } = this.state;
    const { inputError, errorMessage } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-2 Input'}>
          <input className="form-control-plaintext"
            type="text" 
            value={this.props.code.toUpperCase()}
            readOnly
          />
        </div>
        <div className={'form-group col-6 Form'}>
          <input className={`form-control ${inputError ? 'is-invalid': ''}`}
            type="text" 
            value={numberOfData}
            onChange={event => this.setState({ numberOfData: event.target.value })}
            placeholder="Wpisz liczbę ostatnich kursów"
          />
          {(inputError) ?
            <p style={{color: 'red'}}>{errorMessage}</p> :
            ''
          }
        </div>
        <button type="submit" className={'btn btn-primary col-4 SearchButton'} disabled={this.props.code === ''}>Pokaż</button>
      </form> 
    );
  }
};