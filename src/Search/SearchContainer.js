import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCardRequest, deleteCardRequest, showDetails, getCurrencyRequest, getCurrenciesTableRequest } from './SearchActions';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import './SearchContainer.css';

const SearchContainer = ({ getCurrency, searchViewData, addCard, showDetails, deleteCard, getCurrenciesTable }) => {
  return (
    <div className={'col-4 SearchView'}>
      <Search getCurrency={getCurrency}
        searchError={searchViewData.searchError}
        getCurrenciesTable={getCurrenciesTable}
        currenciesTable={searchViewData.currenciesTable}
      />
      {(searchViewData.temporaryCard !== null) ?
        <Card cardData={searchViewData.temporaryCard}
          signedIn={searchViewData.signedIn}
          userSignedIn={searchViewData.userSignedIn}
          addCard={addCard}
          showDetails={showDetails}
          isTemporary={true}
          cards={searchViewData.cards}
        /> :
        <br />
      }
      {searchViewData.addCardError ? 
        <p style={{ color: 'red', textAlign: 'center' }}>
          <br />
          {searchViewData.addCardErrorMessage}
        </p> : 
        ''
      }
      <CardList cards={searchViewData.cards}
        signedIn={searchViewData.signedIn}
        userSignedIn={searchViewData.userSignedIn}
        deleteCard={deleteCard}
        showDetails={showDetails}
      />
    </div>
  );
};

const mapDispatchToProps = {
  addCard: addCardRequest,
  deleteCard: deleteCardRequest,
  showDetails,
  getCurrency: getCurrencyRequest,
  getCurrenciesTable :getCurrenciesTableRequest,
};

SearchContainer.propTypes = {
  searchViewData: PropTypes.object,
  addCard: PropTypes.func,
  deleteCard: PropTypes.func,
  showDetails: PropTypes.func,
  getCurrency: PropTypes.func,
  getCurrenciesTable: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SearchContainer);