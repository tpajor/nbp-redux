import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCard, deleteCard, showDetails, getCurrencyRequest } from '../Actions';

import Search from './Search';
import Card from './Card';
import CardList from './CardList';

import './SearchContainer.css';

const SearchContainer = (props) => {
  return (
    <div className={'col-4 SearchView'}>
      <Search getCurrency={props.getCurrency}
        searchError={props.searchViewData.searchError}
        searchErrorMessage={props.searchViewData.searchErrorMessage}
      />
      {(props.searchViewData.temporaryCard !== null) ?
        <Card cardData={props.searchViewData.temporaryCard}
          addCard={props.addCard}
          showDetails={props.showDetails}
          isTemporary={true}
        /> :
        <br />
      }
      <CardList cards={props.searchViewData.cards}
        deleteCard={props.deleteCard}
        showDetails={props.showDetails}
      />
    </div>
  );
};

const mapDispatchToProps = {
  addCard,
  deleteCard,
  showDetails,
  getCurrency: getCurrencyRequest,
};

SearchContainer.propTypes = {
  searchViewData: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(SearchContainer);