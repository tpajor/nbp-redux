import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = (props) => {
  return(
    <div>
      <h3 className="text-center">
        {(props.dataToPlot !== null) ?
          amountOfRatesText(props.dataToPlot.length) :
          ''
        }
      </h3>
      <LineChart width={props.contWidth} height={props.contWidth * 0.6} data={props.dataToPlot}>
        <XAxis dataKey="name" hide={true} />
        <YAxis domain={[dataMin => ((dataMin * 0.99).toFixed(2)), dataMax => ((dataMax * 1.01).toFixed(2))]} />
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
    return `${amount} ostanie kursy`
  } else {
    return `${amount} ostatnich kursów`;
  }
}

export default Chart;