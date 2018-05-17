import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from "throttle-debounce";

import './Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currencyCode: '',
      autocomplete: [],
      inputError: false,
      activeItemPosition: 0,
      hover: false,
    };
    this.setAutocompleteDebounce = throttle(200, this.setAutocomplete);
  }
  

  handleFocus = () => {
    this.props.getCurrenciesTable();
  }

  handleSubmit = event => {
    event.preventDefault();
    const listOfMatchingCurrencies = this.props.currenciesTable.filter(currency => currency === this.state.currencyCode.toUpperCase());
    if (listOfMatchingCurrencies.length === 1) {
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
        this.setState({ autocomplete: listOfAutocompleteMatchingInput, inputError: false, activeItemPosition: 0 });
      } else {
        this.setState({ autocomplete: [], inputError: false, activeItemPosition: 0 })
      }
    } else {
      this.setState({ autocomplete: [], inputError: true, activeItemPosition: 0 });
    }
  }

  handleChange = event => {
    this.setState({ currencyCode: event.target.value }, () => {
      this.setAutocompleteDebounce(this.state.currencyCode);
    });
  }

  handleKeyDown = event => {
    if (event.keyCode === 38 && this.state.activeItemPosition > 0) {
      this.setState(prevState => ({ activeItemPosition: prevState.activeItemPosition - 1 }));
    } else if (event.keyCode === 40 && this.state.activeItemPosition < this.state.autocomplete.length - 1) {
      this.setState(prevState => ({ activeItemPosition: prevState.activeItemPosition + 1 }));
    } else if (event.keyCode === 13) {
      if (this.state.currencyCode === this.state.autocomplete[0] && this.state.autocomplete.length === 1) {
        this.handleSubmit(event);
      } else if (this.state.autocomplete.length > 0) {
        const chosenCurrency = this.state.autocomplete[this.state.activeItemPosition];
        this.setState({ currencyCode: chosenCurrency, autocomplete: [].concat(chosenCurrency) })
      }
    }
  }

  handleClick = (event, currency) => {
    event.preventDefault();
    this.setState({ currencyCode: currency, autocomplete: this.state.autocomplete.filter(currencyToMatch => currencyToMatch === currency) })
  }

  handleMouseEnter = event => {
    event.preventDefault();
    this.setState({ hover: true });
  }

  handleMouseLeave = event => {
    event.preventDefault();
    this.setState({ hover: false });
  }

  handleHoverChoice = (event, i) => {
    event.preventDefault();
    this.setState({ activeItemPosition: i })
  }

  render() {
    const { searchError } = this.props;
    const { currencyCode, inputError, activeItemPosition, hover } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={'Form'}>
        <div className={'form-group col-8 Form FormInput'}>
          <input className={`form-control  ${(inputError || searchError) ? 'is-invalid' : ''}`}
            onFocus={this.handleFocus}
            type="text" 
            value={currencyCode}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Wpisz kod waluty"
          />
          {(this.state.autocomplete.length > 0) ? 
            <ol className="CurrencyList" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
              {this.state.autocomplete.map((currency, i) => <li key={i} className={'Currency'} onMouseEnter={event => this.handleHoverChoice(event, i)}>
                <button onClick={event => this.handleClick(event, currency)} className={`CurrencyButton ${(activeItemPosition === i && !hover) ? 'active' : ''}`}>
                  <p className="CurrencyText">{currency}</p>
                </button>
              </li>)}
            </ol>: 
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