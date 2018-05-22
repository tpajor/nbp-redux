import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchContainer from './Search/SearchContainer';
import DetailContainer from './Detail/DetailContainer';

import './MainView.css';

export const MainView = ({ searchViewData, detailViewData }) => {
  return (
    <div className={'row MainView'}>
      <SearchContainer searchViewData={searchViewData}/>
      <DetailContainer detailViewData={detailViewData}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchViewData: {
    cards: state.search.cards,
    temporaryCard: state.search.temporaryCard,
    searchError: state.search.searchError,
    signedIn: state.login.signedIn,
    userSignedIn: state.login.userSignedIn,
    addCardError: state.search.addCardError,
    addCardErrorMessage: state.search.addCardErrorMessage,
    currenciesTable: state.search.currenciesTable,
  },
  detailViewData: {
    currencyCodeToViewInDetail: state.search.currencyCodeToViewInDetail,
    lastRates: state.detail.lastRates,
    detailsInputError: state.detail.detailsInputError,
    detailsInputErrorMessage: state.detail.detailsInputErrorMessage,
    signedIn: state.login.signedIn,
  },
});

MainView.propTypes = {
  searchViewData: PropTypes.object,
  detailViewData: PropTypes.object,
};

export default connect(mapStateToProps)(MainView);