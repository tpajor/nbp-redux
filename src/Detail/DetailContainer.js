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
    return (
      <div  className={'col-8 DetailView'}>
        <Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        {this.props.detailViewData.signedIn ? 
          <button className="btn btn-primary SignButton" onClick={() => this.props.signInOrOut(false)}>
            Wyloguj
          </button> :
          <Link to='/login' className="btn btn-primary SignButton">
            Zaloguj
          </Link>
        }
        <div id={'Chart'} className={'Chart'}>
          <Input currencyCodeToViewInDetail={this.props.detailViewData.currencyCodeToViewInDetail}
            getInputedNumberOfLastRates={this.props.getInputedNumberOfLastRates}
            detailsInputError={this.props.detailViewData.detailsInputError}
            detailsInputErrorMessage={this.props.detailViewData.detailsInputErrorMessage}
          />
          <Chart dataToPlot={this.props.detailViewData.lastRates}
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
};

export default connect(null, mapDispatchToProps)(DetailContainer);