import React from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';

import Input from './Input';
import Chart from './Chart';

import './DetailContainer.css';

export default class DetailContainer extends React.Component {
  state = { 
    dataForChart: null,
    inputError: false,
    errorMessage: '',
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

  getDataForChart = (numberOfData) => {
    if (isNaN(numberOfData)) {
      this.setState({ errorMessage: 'Wpisz liczbę', inputError: true });
    } else if (numberOfData > 250 || numberOfData <= 0) {
      this.setState({ errorMessage: 'Maksymalna liczba notowań to 250', inputError: true });
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${this.props.code}/last/${numberOfData}/`)
        .then(res => {
          const chartData = this.prepareDataForChart(res.data);
          this.setState({ dataForChart: chartData, inputError: false, });
        })
        .catch(() => {
          this.setState({ errorMessage: 'Błąd serwera. Spróbuj ponownie', inputError: true, });
        });
    }
  };

  prepareDataForChart = (dataFromApi) => {
    return dataFromApi.rates.map(this.normalizeDataForChart);
  };

  normalizeDataForChart = (data, i) => {
    const dataNormalizedForChart = {};
    dataNormalizedForChart.name = data.effectiveDate;
    dataNormalizedForChart.kupno = data.ask;
    dataNormalizedForChart.sprzedaż = data.bid;
    return dataNormalizedForChart;
  };

  render() {
    const { dataForChart, inputError, errorMessage, contWidth } = this.state;
    return (
      <div  className={'col-8 DetailView'}>
        <Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        <div id={'Chart'} className={'Chart'}>
          <Input code={this.props.code}
            getDataForChart={this.getDataForChart}
            inputError={inputError}
            errorMessage={errorMessage}
          />
          <Chart dataToPlot={dataForChart}
            contWidth={contWidth}
          />
        </div>
      </div>
    );
  }
};