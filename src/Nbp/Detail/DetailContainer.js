import React from 'react';
import Clock from 'react-live-clock';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getInputedNumberOfLastRatesRequest } from './DetailActions';
import { signInOrOut } from '../../Login/LoginActions';

import Input from './Input';
import Chart from './Chart';

import './DetailContainer.css';

export class DetailContainer extends React.Component {
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
    let width = 300;
    if(document.getElementById('Chart')) width = document.getElementById('Chart').clientWidth;
    this.setState({ contWidth: width * 0.8, });
  };

  render() {
    const { contWidth } = this.state;
    const { signInOrOut, getInputedNumberOfLastRates, detailViewData,  } = this.props;
    return (
      <div  className={'col-8 DetailView'}>
        <Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        {detailViewData.signedIn ? 
          <Link to='/login' className="btn btn-primary SignButton" onClick={() => signInOrOut(true)}>
            Wyloguj
          </Link> :
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