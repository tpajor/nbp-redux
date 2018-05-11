import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchContainer from './Search/SearchContainer';
import DetailContainer from './Detail/DetailContainer';

import './MainView.css';

const MainView = ({ searchViewData, detailViewData }) => {
  return (
    <div className={'row MainView'}>
      <SearchContainer searchViewData={searchViewData}/>
      <DetailContainer detailViewData={detailViewData}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchViewData: {
    cards: state.cards,
    temporaryCard: state.temporaryCard,
    searchError: state.searchError,
    searchErrorMessage: state.searchErrorMessage,
    signedIn: state.signedIn,
    userSignedIn: state.userSignedIn,
  },
  detailViewData: {
    currencyCodeToViewInDetail: state.currencyCodeToViewInDetail,
    lastRates: state.lastRates,
    detailsInputError: state.detailsInputError,
    detailsInputErrorMessage: state.detailsInputErrorMessage,
    signedIn: state.signedIn,
  },
});

MainView.propTypes = {
  searchViewData: PropTypes.object,
  detailViewData: PropTypes.object,
};

export default connect(mapStateToProps)(MainView);