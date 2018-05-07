import React from 'react';
import axios from 'axios';
import uuid from 'uuid';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import './SearchContainer.css';

export default class SearchContainer extends React.Component {
  state = { 
    cards: [],
    temporaryCard: null,
    inputError: false,
    errorMessage: '',
  };

  searchByCode = (currencyCode) => {
    if (currencyCode.length > 3 || currencyCode.length < 3) {
      this.setState({ inputError: true, errorMessage: 'Wpisz trzyliterowy kod waluty, np. "USD", "chf"' });
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
        .then(res => {
          this.setState({ temporaryCard: res.data, inputError: false, });
        })
        .catch(() => {
          this.setState({ inputError: true, errorMessage: 'Brak notowań waluty lub nieprawidłowy kod waluty' })
        });
    }
  };

  saveCard = (card) => {
    this.setState(prevState => ({ 
      cards: prevState.cards.concat({ ...card, id: uuid.v4() }) 
    }));
  };

  deleteCard = (cardToDelete) => {
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card !== cardToDelete)
    }));
  };

  render() {
    const { temporaryCard, cards, inputError, errorMessage } = this.state;
    return (
      <div className={'col-4 SearchView'}>
        <Search searchByCode={this.searchByCode}
          inputError={inputError}
          errorMessage={errorMessage}
        />
        {(temporaryCard !== null) ?
          <Card cardData={temporaryCard}
            saveCard={this.saveCard}
            showDetails={this.props.showDetails}
            isTemporary={true}
          /> :
          <br />
        }
        <CardList cards={cards}
          deleteCard={this.deleteCard}
          showDetails={this.props.showDetails}
        />
      </div>
    );
  }
};