import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const Chart = ({ dataToPlot, contWidth }) => {
  return(
    <div>
      <h3 className="text-center">
        {(dataToPlot !== null) ?
          amountOfRatesText(dataToPlot.length) :
          ''
        }
      </h3>
      <LineChart width={contWidth} height={contWidth * 0.6} data={dataToPlot}>
        <XAxis dataKey="name" hide={true} />
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="kupno" stroke="#8884d8" activeDot={{r: 4}} dot={false} />
        <Line type="monotone" dataKey="sprzedaż" stroke="#82ca9d" activeDot={{r: 4}} dot={false} />
      </LineChart>
    </div>
  );
}

const amountOfRatesText = (amount) => {
  if (amount === 1) {
    return 'Najnowszy kurs';
  } else if (amount % 10 === 2 || amount % 10 === 3 || amount % 10 === 4) {
    return `${amount} ostatnie kursy`
  } else {
    return `${amount} ostatnich kursów`;
  }
}

Chart.propTypes = {
  dataToPlot: PropTypes.array,
  contWidth: PropTypes.number,
};

export default Chart;