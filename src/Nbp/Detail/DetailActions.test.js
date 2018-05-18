import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GET_INPUTED_NUMBER_OF_LAST_RATES, DETAIL_INPUT_ERROR, RESET, getInputedNumberOfLastRates, 
  detailInputError, getInputedNumberOfLastRatesRequest, resetDetailState} from './DetailActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Detail Container Actions', () => {
  describe('should create', () => {
    it('action for getting inputed number of last rates of currency', () => {
      const arrayOfLastRates = [{ask: "3.5", bid: "3.3"}, {ask: "3.6", bid: "3.1"}]
      const expectedAction = {
        type: GET_INPUTED_NUMBER_OF_LAST_RATES,
        lastRates: arrayOfLastRates
      }
      expect(getInputedNumberOfLastRates(arrayOfLastRates)).toEqual(expectedAction);
    });

    it('action for detail view input error', () => {
      const detailsInputErrorMessage = 'error'
      const expectedAction = {
        type: DETAIL_INPUT_ERROR,
        detailsInputErrorMessage
      }
      expect(detailInputError(detailsInputErrorMessage)).toEqual(expectedAction);
    });

    it('action to reset state', () => {
      const expectedAction = {
        type: RESET,
      }
      expect(resetDetailState()).toEqual(expectedAction);
    });
  });

  describe('should prepare data', () => {
    const mock = new MockAdapter(axios);

    it('to get inputed number of last rates of currency', async () => {
      const store = mockStore({ lastRates: [] });
      const numberOfRates = 30;
      const currencyCode = 'usd'
      const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/${numberOfRates}/`;
      const expectedResponse = [{ask: "3.5", bid: "3.3"}, {ask: "3.6", bid: "3.1"}];
      const expectedAction = {
        type: GET_INPUTED_NUMBER_OF_LAST_RATES,
        lastRates: expectedResponse,
      }
      mock.onGet(url).reply(200, expectedResponse);
      store.dispatch(getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode)).then(() => {
        expect(mock.handlers.get[0][4]).toEqual(expectedResponse);
        expect(store.getActions()).toEqual([expectedAction]);
        mock.reset();
      });
    });

    it('but fail due to server error', async () => {
      const store = mockStore({ detailsInputErrorMessage: '' });
      const numberOfRates = 30;
      const currencyCode = 'usd'
      const url = `https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/${numberOfRates}/`;
      const expectedAction = {
        type: DETAIL_INPUT_ERROR,
        detailsInputErrorMessage: 'Błąd serwera. Spróbuj ponownie'
      }
      mock.onGet(url).reply(404);
      store.dispatch(getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode)).then(() => {
        expect(mock.history.get[0].url).toEqual(url);
        expect(store.getActions()).toEqual([expectedAction]);
        mock.reset();
      });
    });

    it('but fails due to number of last rates not being a number', () => {
      const store = mockStore({ detailsInputErrorMessage: '' });
      const numberOfRates = 'abc';
      const currencyCode = 'usd';
      const expectedAction = {
        type: DETAIL_INPUT_ERROR,
        detailsInputErrorMessage: 'Wpisz liczbę'
      }
      store.dispatch(getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode));
      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('but fails due to number of last rates being greater than 250 (nbp api can get only up to 250 rates)', () => {
      const store = mockStore({ detailsInputErrorMessage: '' });
      const numberOfRates = 251;
      const currencyCode = 'usd';
      const expectedAction = {
        type: DETAIL_INPUT_ERROR,
        detailsInputErrorMessage: 'Maksymalna liczba notowań to 250'
      }
      store.dispatch(getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode));
      expect(store.getActions()).toEqual([expectedAction]);
    });

    it('but fails due to number of last rates being less than or equal to 0', () => {
      const store = mockStore({ detailsInputErrorMessage: '' });
      const numberOfRates = 0;
      const currencyCode = 'usd';
      const expectedAction = {
        type: DETAIL_INPUT_ERROR,
        detailsInputErrorMessage: 'Maksymalna liczba notowań to 250'
      }
      store.dispatch(getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode));
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});