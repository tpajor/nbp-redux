import { ADD_CARD, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, GET_INPUTED_NUMBER_OF_LAST_RATES, SIGN, SIGN_ERROR, REGISTER_USER, POPULATE_USERS, SEARCH_INPUT_ERROR, DETAIL_INPUT_ERROR, ADD_CARD_ERROR } from './Actions';

const initialState = {
  cards: [],
  currencyCodeToViewInDetail: '',
  temporaryCard: null,
  searchError: false,
  searchErrorMessage: '',
  lastRates: [],
  detailsInputError: false,
  detailsInputErrorMessage: '',
  signedIn: false,
  userSignedIn: '',
  users: [],
  signingError: false,
  signingErrorMessage: '',
  addCardError: false,
  addCardErrorMessage: '',
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
      const updateCards = state.cards.concat(action.card);
      return { ...state, cards: updateCards, addCardError: false, addCardErrorMessage: '', };
    }

    case ADD_CARD_ERROR: {
      return { ...state, addCardError: true, addCardErrorMessage: 'Karta tej waluty jest już przypięta' }
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
        searchError: false,
        searchErrorMessage: '',
      };
    }

    case SEARCH_INPUT_ERROR: {
      return { ...state, temporaryCard: null, searchError: true, searchErrorMessage: action.searchErrorMessage}
    }

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

    case SIGN_ERROR: {
      return { ...state, signingError: true, signingErrorMessage: action.signingErrorMessage };
    }

    case SIGN: {
      if (action.isSignedIn) {
        return { ...initialState, users: state.users };
      } else {
        return { ...initialState, signedIn: true, userSignedIn: action.user.userName, cards: action.user.cards, users: state.users };
      }
    }

    case REGISTER_USER: {
      return { ...state, signedIn: true, userSignedIn: action.userName, users: state.users };
    }

    case POPULATE_USERS: {
      return { ...state, users: action.users.users };
    }

    default: {
      return { ...state };
    }
  }
}