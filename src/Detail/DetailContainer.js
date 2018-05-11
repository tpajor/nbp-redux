import React from 'react';
import Clock from 'react-live-clock';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getInputedNumberOfLastRatesRequest, signInOrOut } from '../Actions';

import Input from './Input';
import Chart from './Chart';

import './DetailContainer.css';

class DetailContainer extends React.Component {
  state = { 
    contWidth: 0,
  };

  componentDidMount = () => {
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.setWidth);
  };

  setWidth = () => {
    const width = document.getElementById('Chart').clientWidth;
    this.setState({ contWidth: width * 0.8, });
  };

  render() {
    const { contWidth } = this.state;
    const { signInOrOut, getInputedNumberOfLastRates, detailViewData,  } = this.props;
    return (
      <div  className={'col-8 DetailView'}>
        <Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        {detailViewData.signedIn ? 
          <button className="btn btn-primary SignButton" onClick={() => signInOrOut(true)}>
            Wyloguj
          </button> :
          <Link to='/login' className="btn btn-primary SignButton">
            Zaloguj
          </Link>
        }
        <div id={'Chart'} className={'Chart'}>
          <Input currencyCodeToViewInDetail={detailViewData.currencyCodeToViewInDetail}
            getInputedNumberOfLastRates={getInputedNumberOfLastRates}
            detailsInputError={detailViewData.detailsInputError}
            detailsInputErrorMessage={detailViewData.detailsInputErrorMessage}
          />
          <Chart dataToPlot={detailViewData.lastRates}
            contWidth={contWidth}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = {
  getInputedNumberOfLastRates: getInputedNumberOfLastRatesRequest,
  signInOrOut,
};

DetailContainer.propTypes = {
  detailViewData: PropTypes.object,
  getInputedNumberOfLastRates: PropTypes.func,
  signInOrOut: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(DetailContainer);