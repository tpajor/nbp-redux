import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from "throttle-debounce";

import './Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currencyCode: '',
      autocomplete: [],
      inputError: false,
    };
    this.setAutocompleteDebounce = debounce(500, this.setAutocomplete);
  }
  

  handleFocus = () => {
    this.props.getCurrenciesTable();
  }

  handleSubmit = event => {
    event.preventDefault();
    const listOfMatchingCurrencies = this.props.currenciesTable.filter(currency => currency === this.state.currencyCode.toUpperCase());
    if (listOfMatchingCurrencies.length > 0) {
      this.setState({ autocomplete: [], inputError: false });
      this.props.getCurrency(this.state.currencyCode.toLowerCase());
    } else {
      this.setState({ inputError: true });
    }
  }

  setAutocomplete = input => {
    const listOfAutocompleteMatchingInput = this.props.currenciesTable.filter(currency => currency.indexOf(input.toUpperCase()) >= 0);
    if (listOfAutocompleteMatchingInput.length > 0) {
      if (input.length > 0) {
      this.setState({ autocomplete: listOfAutocompleteMatchingInput, inputError: false });
      } else {
        this.setState({ autocomplete: [], inputError: false})
      }
    } else {
      this.setState({ autocomplete: [], inputError: true });
    }
  }

  handleChange = event => {
    this.setState({ currencyCode: event.target.value }, () => {
      this.setAutocompleteDebounce(this.state.currencyCode);
    });
  }

  handleClick = (event, currency) => {
    event.preventDefault();
    this.setState({ currencyCode: currency, autocomplete: this.state.autocomplete.filter(currencyToMatch => currencyToMatch === currency) })
  }
  
  render() {
    const { searchError } = this.props;
    const { currencyCode, inputError } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-8 Form'}>
          <input className={`form-control  ${(inputError || searchError) ? 'is-invalid' : ''}`}
            onFocus={this.handleFocus}
            type="text" 
            value={currencyCode}
            onChange={this.handleChange}
            placeholder="Wpisz kod waluty"
          />
          {(this.state.autocomplete.length > 0) ? 
            <ul className="CurrencyList">
              {this.state.autocomplete.map((currency, i) => <li key={i} className="Currency">
                <button onClick={event => this.handleClick(event, currency)} className="CurrencyButton">
                  <p className="CurrencyText">{currency}</p>
                </button>
              </li>)}
            </ul>: 
            ''
          }
          {(inputError) ?
            <p style={{ color: 'red' }}>Wpisz trzyliterowy kod waluty, np. "USD", "chf"</p> :
            ''
          }
          {(searchError) ?
            <p style={{ color: 'red' }}>Błąd serwera. Spróbuj ponownie później.</p> :
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
  getCurrenciesTable: PropTypes.func,
  currenciesTable: PropTypes.array,
};