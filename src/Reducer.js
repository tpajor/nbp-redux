import { ADD_CARD, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, GET_INPUTED_NUMBER_OF_LAST_RATES } from './Actions';

const initialState = {
  cards: [],
  currencyCodeToViewInDetail: '',
  temporaryCard: null,
  searchError: false,
  searchErrorMessage: '',
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
}

function prepareDataForChart(dataFromApi) {
  return dataFromApi.rates.map(normalizeDataForChart);
}

export default function currencies(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD: {
      const newCard = { ...action.card, id: action.id };
      const updatedCards = state.cards.concat(newCard);
      return { ...state, cards: updatedCards };
    }

    case DELETE_CARD: {
      const updatedCards = state.cards.filter(card => card.id !== action.cardId)
      return { ...state, cards: updatedCards };
    }

    case SHOW_DETAILS: {
      return { ...state, currencyCodeToViewInDetail: action.currencyCodeToViewInDetail };
    }

    case GET_CURRENCY: {
      return { ...state, 
        temporaryCard: action.temporaryCard, 
        searchError: action.searchError, 
        searchErrorMessage: action.searchErrorMessage 
      };
    }

    case GET_INPUTED_NUMBER_OF_LAST_RATES: {
      if (action.lastRates.rates) {
        return { ...state,
          lastRates: prepareDataForChart(action.lastRates),
          detailsInputError: action.detailsInputError,
          detailsInputErrorMessage: action.detailsInputErrorMessage,
        };
      } else {
        return { ...state,
          lastRates: [],
          detailsInputError: action.detailsInputError,
          detailsInputErrorMessage: action.detailsInputErrorMessage,
        };
      }
      
    }

    default: {
      return { ...state };
    }
  }
}