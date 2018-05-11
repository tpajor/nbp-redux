import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCardRequest, deleteCardRequest, showDetails, getCurrencyRequest } from '../Actions';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import './SearchContainer.css';

const SearchContainer = ({ getCurrency, searchViewData, addCard, showDetails, deleteCard }) => {
  return (
    <div className={'col-4 SearchView'}>
      <Search getCurrency={getCurrency}
        searchError={searchViewData.searchError}
        searchErrorMessage={searchViewData.searchErrorMessage}
      />
      {(searchViewData.temporaryCard !== null) ?
        <Card cardData={searchViewData.temporaryCard}
          signedIn={searchViewData.signedIn}
          userSignedIn={searchViewData.userSignedIn}
          addCard={addCard}
          showDetails={showDetails}
          isTemporary={true}
        /> :
        <br />
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
};

SearchContainer.propTypes = {
  searchViewData: PropTypes.object,
  addCard: PropTypes.func,
  deleteCard: PropTypes.func,
  showDetails: PropTypes.func,
  getCurrency: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SearchContainer);