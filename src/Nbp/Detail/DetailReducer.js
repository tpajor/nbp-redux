import { GET_INPUTED_NUMBER_OF_LAST_RATES, DETAIL_INPUT_ERROR, RESET } from './DetailActions';

export const initialState = {
  lastRates: [],
  detailsInputError: false,
  detailsInputErrorMessage: '',
}

function normalizeDataForChart(data, i) {
  const dataNormalizedForChart = {};
  dataNormalizedForChart.name = data.effectiveDate;
  dataNormalizedForChart.kupno = data.ask;
  dataNormalizedForChart.sprzedaż = data.bid;
  return dataNormalizedForChart;
};

function prepareDataForChart(dataFromApi) {
  return dataFromApi.rates.map(normalizeDataForChart);
};

export default function detail(state = initialState, action) {
  switch (action.type) {
    case DETAIL_INPUT_ERROR: {
      return { ...state, lastRates: [], detailsInputError: true, detailsInputErrorMessage: action.detailsInputErrorMessage };
    }

    case GET_INPUTED_NUMBER_OF_LAST_RATES: {
      return { ...state,
        lastRates: prepareDataForChart(action.lastRates),
        detailsInputError: false,
        detailsInputErrorMessage: '',
      };
    }

    case RESET: {
      return { ...initialState };
    }

    default: {
      return { ...state };
    }
  }
};