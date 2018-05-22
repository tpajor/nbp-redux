import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ADD_CARD, ADD_CARD_ERROR, DELETE_CARD, SHOW_DETAILS, GET_CURRENCY, SEARCH_INPUT_ERROR, GET_CURRENCIES_TABLE, POPULATE_CARDS, 
  addCard, addCardError, addCardRequest, deleteCard, deleteCardRequest, showDetails, getCurrency, searchInputError, getCurrencyRequest, 
  getCurrenciesTable, getCurrenciesTableRequest, populateCards } from './SearchActions';

jest.mock('../../Services/apiCaller');
jest.mock('../../Services/uniqueIdGenerator');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Container Actions', () => {
  describe('should create', () => {
    it('add card action', () => {
      const card = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
      const expectedAction = {
        type: ADD_CARD,
        card
      }
      expect(addCard(card)).toEqual(expectedAction);
    });

    it('add card error action', () => {
      const expectedAction = {
        type: ADD_CARD_ERROR,
      }
      expect(addCardError()).toEqual(expectedAction);
    });

    it('delete card action', () => {
      const cardId = 'someId';
      const expectedAction = {
        type: DELETE_CARD,
        cardId
      }
      expect(deleteCard(cardId)).toEqual(expectedAction);
    });

    it('action that store currency for detail view', () => {
      const currencyCode = 'usd';
      const expectedAction = {
        type: SHOW_DETAILS,
        currencyCodeToViewInDetail: currencyCode
      }
      expect(showDetails(currencyCode)).toEqual(expectedAction);
    });

    it('get inputed currency action', () => {
      const card = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
      const expectedAction = {
        type: GET_CURRENCY,
        temporaryCard: card
      }
      expect(getCurrency(card)).toEqual(expectedAction);
    });

    it('search input error action', () => {
      const expectedAction = {
        type: SEARCH_INPUT_ERROR
      }
      expect(searchInputError()).toEqual(expectedAction);
    });

    it('action for getting currencies for input autocomplete', () => {
      const table = ['usd', 'aud', 'chf'];
      const expectedAction = {
        type: GET_CURRENCIES_TABLE,
        table
      }
      expect(getCurrenciesTable(table)).toEqual(expectedAction);
    });

    it('action that stores cards pinned to logged in user', () => {
      const cards = [{code: 'usd', rates: {ask: 3.5, bid: 3.3}}, {code: 'chf', rates: {ask: 3.2, bid: 3.8}}];
      const expectedAction = {
        type: POPULATE_CARDS,
        cards
      }
      expect(populateCards(cards)).toEqual(expectedAction);
    });
  });

  describe('should prepare data', async () => {
    describe('for add card action', () => {
      it('for logged in user', () => {
        const store = mockStore({ cards: [] });
        const url = 'http://localhost:8000/api/card';
        const card = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
        const id = 'someId';
        const userName = '1';
        const data = { card: { ...card, id }, userName };
        const options = { body: data, headers: { 'content-type': 'application/json' }, method: "post" };
        const isSignedIn = true;
        const cards = [{code: 'aud', rates: {ask: 1.5, bid: 1.3}}, {code: 'chf', rates: {ask: 3.2, bid: 3.8}}];
        const expectedAction = {
          type: ADD_CARD,
          card: { ...card, id }
        }
        store.dispatch(addCardRequest(card, userName, isSignedIn, cards)).then(() => {
          expect(fetch).toHaveBeenCalledWith(url, options);
          options.body = undefined;
          options.method = "get";
          expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/user`, options)
          expect(store.getActions()).toEqual([expectedAction]);
        });
      });

      it('for logged out user', () => {
        const store = mockStore({ userName: '', signingErrorMessage: '' });
        const card = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
        const id = 'someId';
        const userName = '1';
        const isSignedIn = false;
        const cards = [{code: 'aud', rates: {ask: 1.5, bid: 1.3}}, {code: 'chf', rates: {ask: 3.2, bid: 3.8}}];
        const expectedAction = {
          type: ADD_CARD,
          card: { ...card, id }
        };
        store.dispatch(addCardRequest(card, userName, isSignedIn, cards));
        expect(store.getActions()).toEqual([expectedAction]);
      });

      it('but fails due to card already been pinned', () => {
        const store = mockStore({ userName: '', signingErrorMessage: '' });
        const card = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
        const userName = '1';
        const isSignedIn = false;
        const cards = [card, {code: 'chf', rates: {ask: 3.2, bid: 3.8}}];
        const expectedAction = {
          type: ADD_CARD_ERROR,
        };
        store.dispatch(addCardRequest(card, userName, isSignedIn, cards));
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });

    describe('for delete card action', () => {
      it('for logged in user', () => {
        const store = mockStore({ cards: [] });
        const url = 'http://localhost:8000/api/card';
        const cardId = 'someId';
        const userName = '1';
        const data = { cardId, userName };
        const options = { body: data, headers: { 'content-type': 'application/json' }, method: "delete" };
        const isSignedIn = true;
        const expectedAction = {
          type: DELETE_CARD,
          cardId
        }
        store.dispatch(deleteCardRequest(cardId, userName, isSignedIn)).then(() => {
          expect(fetch).toHaveBeenCalledWith(url, options);
          options.body = undefined;
          options.method = "get";
          expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/user`, options)
          expect(store.getActions()).toEqual([expectedAction]);
        });
      });

      it('for logged out user', () => {
        const store = mockStore({ cards: [] });
        const cardId = 'someId';
        const userName = '1';
        const isSignedIn = false;
        const expectedAction = {
          type: DELETE_CARD,
          cardId
        }
        store.dispatch(deleteCardRequest(cardId, userName, isSignedIn));
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });

    const mock = new MockAdapter(axios);

    describe('for storing temporary card', () => {
      it('with success', () => {
        const store = mockStore({ temporaryCard: null });
        const currencyCode = 'usd';
        const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`;
        const expectedResponse = {code: 'usd', rates: {ask: 3.5, bid: 3.3}};
        const expectedAction = {
          type: GET_CURRENCY,
          temporaryCard: expectedResponse
        }
        mock.onGet(url).reply(200, expectedResponse);
        store.dispatch(getCurrencyRequest(currencyCode)).then(() => {
          expect(mock.handlers.get[0][4]).toEqual(expectedResponse);
          expect(store.getActions()).toEqual([expectedAction]);
          mock.reset();
        });
      });

      it('but fails due to server error', () => {
        const store = mockStore({ searchInputError: true });
        const currencyCode = 'usd';
        const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`;
        const expectedAction = {
          type: SEARCH_INPUT_ERROR,
        }
        mock.onGet(url).reply(404);
        store.dispatch(getCurrencyRequest(currencyCode)).then(() => {
          expect(mock.history.get[0].url).toEqual(url);
          expect(store.getActions()).toEqual([expectedAction]);
          mock.reset();
        });
      });
    });

    it('to store table of currencies available with nbp api', () => {
      const store = mockStore({ currenciesTable: [] });
      const url = `https://api.nbp.pl/api/exchangerates/tables/c/today/`;
      const expectedResponse = ['usd', 'aud', 'chf'];
      const expectedAction = {
        type: GET_CURRENCIES_TABLE,
        table: expectedResponse
      }
      mock.onGet(url).reply(200, expectedResponse);
      store.dispatch(getCurrenciesTableRequest()).then(() => {
        expect(mock.handlers.get[0][4]).toEqual(expectedResponse);
        expect(store.getActions()).toEqual([expectedAction]);
        mock.reset();
      });
    });
  });
});