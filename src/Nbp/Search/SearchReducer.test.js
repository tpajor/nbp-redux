import reducer, { initialState } from './SearchReducer';
import { ADD_CARD, ADD_CARD_ERROR, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, SEARCH_INPUT_ERROR, GET_CURRENCIES_TABLE, POPULATE_CARDS } from './SearchActions';

describe('Search components reducer', () => {
  it('should return initial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle adding a card', () => {
    const card = { code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};
    const card2 = { code: 'CHF', currency: 'frank szwajcarski', rates: { ask: 2.3, bid: 2.4 }};

    const expectedState = {
      cards: [card],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: false,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: true,
      addCardErrorMessage: 'error',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: false,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: ADD_CARD,
      card
    })).toEqual(expectedState);

    startState.cards = [card2];
    expectedState.cards = [card2, card];

    expect(reducer(startState, {
      type: ADD_CARD,
      card
    })).toEqual(expectedState);
  });

  it('should handle add card error', () => {
    const expectedState = {
      cards: [],
      addCardError: true,
      addCardErrorMessage: 'Karta tej waluty jest już przypięta',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: false,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: false,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: ADD_CARD_ERROR
    })).toEqual(expectedState);

    startState.addCardError = true;
    startState.addCardErrorMessage = 'error';

    expect(reducer(startState, {
      type: ADD_CARD_ERROR
    })).toEqual(expectedState);
  });

  it('should handle deleting a card', () => {
    const cardId = 'someId';
    const card = { id: 'someId', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};
    const card2 = { id: 'someId2', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};

    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: 'usd',
      temporaryCard: card,
      searchError: false,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: 'usd',
      temporaryCard: card,
      searchError: false,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: DELETE_CARD,
      cardId
    })).toEqual(expectedState);

    startState.cards = [card];

    expect(reducer(startState, {
      type: DELETE_CARD,
      cardId
    })).toEqual(expectedState);

    startState.cards = [card, card2];
    expectedState.cards = [card2];

    expect(reducer(startState, {
      type: DELETE_CARD,
      cardId
    })).toEqual(expectedState);
  });

  it('should handle storing currency code of card for detailed view', () => {
    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: 'usd',
      temporaryCard: null,
      searchError: true,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: true,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: SHOW_DETAILS,
      currencyCodeToViewInDetail: 'usd'
    })).toEqual(expectedState);
  });

  it('should handle storing temporary card', () => {
    const card = { id: 'someId', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};

    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: card,
      searchError: false,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: true,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: GET_CURRENCY,
      temporaryCard: card
    })).toEqual(expectedState);

    startState.searchError = false;

    expect(reducer(startState, {
      type: GET_CURRENCY,
      temporaryCard: card
    })).toEqual(expectedState);
  });

  it('should handle storing temporary card', () => {
    const card = { id: 'someId', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};

    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: true,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: card,
      searchError: false,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: SEARCH_INPUT_ERROR,
    })).toEqual(expectedState);

    startState.searchError = false;

    expect(reducer(startState, {
      type: SEARCH_INPUT_ERROR,
    })).toEqual(expectedState);    
  });

  it('should handle storing temporary card', () => {
    const expectedTable = ['usd', 'chf'];
    const table = [{ rates: [{  code: 'usd', ask: 3.4 }, {  code: 'chf', ask: 1.4 }] }];

    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: true,
      currenciesTable: expectedTable,
    };

    const startState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: true,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: GET_CURRENCIES_TABLE,
      table
    })).toEqual(expectedState); 
  });

  it('should handle storing temporary card', () => {
    const card = { id: 'someId', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};
    const card2 = { id: 'someId2', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};

    const expectedState = {
      cards: [],
      addCardError: false,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: '',
      temporaryCard: null,
      searchError: false,
      currenciesTable: [],
    };

    const startState = {
      cards: [],
      addCardError: true,
      addCardErrorMessage: '',
      currencyCodeToViewInDetail: 'usd',
      temporaryCard: card,
      searchError: true,
      currenciesTable: [],
    };

    expect(reducer(startState, {
      type: POPULATE_CARDS,
      cards: []
    })).toEqual(expectedState);

    expectedState.cards = [card];

    expect(reducer(startState, {
      type: POPULATE_CARDS,
      cards: [card]
    })).toEqual(expectedState);

    expectedState.cards = [card, card2];

    expect(reducer(startState, {
      type: POPULATE_CARDS,
      cards: [card, card2]
    })).toEqual(expectedState);
  });
});