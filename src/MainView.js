import React from 'react';
import { connect } from 'react-redux';

import SearchContainer from './Search/SearchContainer';
import DetailContainer from './Detail/DetailContainer';

import './MainView.css';

const MainView = (props) => {
    return (
      <div className={'row MainView'}>
        <SearchContainer searchViewData={props.searchViewData}/>
        <DetailContainer detailViewData={props.detailViewData}/>
      </div>
    );
};

const mapStateToProps = (state) => ({
  searchViewData: {
    cards: state.cards,
    temporaryCard: state.temporaryCard,
    searchError: state.searchError,
    searchErrorMessage: state.searchErrorMessage,
  },
  detailViewData: {
    currencyCodeToViewInDetail: state.currencyCodeToViewInDetail,
    lastRates: state.lastRates,
    detailsInputError: state.detailsInputError,
    detailsInputErrorMessage: state.detailsInputErrorMessage,
  },
});

export default connect(mapStateToProps)(MainView);