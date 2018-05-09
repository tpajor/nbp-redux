import { ADD_CARD, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, GET_INPUTED_NUMBER_OF_LAST_RATES, SIGN_IN_AND_OUT, REGISTER_USER } from './Actions';

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
  users: [{name: 'ABC', pass: '123'}, {name: 'QWE', pass: '321'}],
  signingError: false,
  signingErrorMessage: '',
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

    case SIGN_IN_AND_OUT: {
      if (action.isSigningIn) {
        const user = state.users.find(user => user.name === action.userName);
        if (user) {
          if (user.pass === action.pass) {
            return { ...state, signedIn: true, signingError: false, signingErrorMessage: '', };
          } else {
            return { ...state, signingError: true, signingErrorMessage: 'Niepoprawne Hasło', };
          }
        } else {
          return { ...state, signingError: true, signingErrorMessage: 'Brak takiego użytkownika', };
        }
      } else {
        return { ...initialState, users: state.users };
      }
    }

    case REGISTER_USER: {
      const user = state.users.find(user => user.name === action.userName);
      if (user) {
        return { ...state, signingError: true, signingErrorMessage: 'Użytkownik już istnieje' };
      } else {
        if (action.pass !== action.repeatPass) {
          return { ...state, signingError: true, signingErrorMessage: 'Hasło nie pasuje do powtórzonego hasła' };
        } else {
          const newUsersArray = state.users.concat({ name: action.userName, pass: action.pass })
          return { ...state, signedIn: true, users: newUsersArray, signingError: false, signingErrorMessage: '' };
        }
      }
      
    }

    default: {
      return { ...state };
    }
  }
}