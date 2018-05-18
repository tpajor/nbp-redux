import { ADD_CARD, ADD_CARD_ERROR, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, SEARCH_INPUT_ERROR, GET_CURRENCIES_TABLE, POPULATE_CARDS } from './SearchActions';

export const initialState = {
  cards: [],
  addCardError: false,
  addCardErrorMessage: '',
  currencyCodeToViewInDetail: '',
  temporaryCard: null,
  searchError: false,
  currenciesTable: [],
}

export default function search(state = initialState, action) {
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
      };
    }

    case SEARCH_INPUT_ERROR: {
      return { ...state, temporaryCard: null, searchError: true }
    }

    case GET_CURRENCIES_TABLE: {
      const newCurrenciesTable = action.table[0].rates.map(currency => currency.code);
      return { ...state, currenciesTable: newCurrenciesTable };
    }

    case POPULATE_CARDS: {
      return { ...initialState, cards: action.cards };
    }

    default: {
      return { ...state };
    }
  }
}