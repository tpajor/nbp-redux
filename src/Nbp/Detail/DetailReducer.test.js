import reducer, { initialState } from './DetailReducer';
import { GET_INPUTED_NUMBER_OF_LAST_RATES, DETAIL_INPUT_ERROR, RESET } from './DetailActions'

describe('Detail components reducer', () => {
  it('should return initial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle detail input error', () => {
    const expectedState = { lastRates: [], detailsInputError: true, detailsInputErrorMessage: 'error' };

    expect(reducer(initialState, {
      type: DETAIL_INPUT_ERROR,
      detailsInputErrorMessage: 'error'
    })).toEqual(expectedState);
  });

  it('should handle returning table of last rates', () => {
    const lastRates = { table: "C", code: "USD", currency: "dolar amerykański", rates: [
      { ask: 3.5983, bid: 3.5271, effectiveDate: "2018-05-07", no: "087/C/NBP/2018" },
      { ask: 3.6088, bid: 3.5374, effectiveDate: "2018-05-08", no: "088/C/NBP/2018" }
    ]};

    const expectedState = { lastRates: [
      { kupno: 3.5983, sprzedaż: 3.5271, name: "2018-05-07" },
      { kupno: 3.6088, sprzedaż: 3.5374, name: "2018-05-08" }
    ], detailsInputError: false, detailsInputErrorMessage: '' };

    expect(reducer(initialState, {
      type: GET_INPUTED_NUMBER_OF_LAST_RATES,
      lastRates
    })).toEqual(expectedState);

    expect(reducer({lastRates: [{ kupno: 3.6088, sprzedaż: 3.5374, name: "2018-05-08" }], 
      detailsInputError: true, detailsInputErrorMessage: 'error' }, {
        type: GET_INPUTED_NUMBER_OF_LAST_RATES,
        lastRates
      })).toEqual(expectedState);
  });

  it('should reset state to initial state', () => {
    const startState = { lastRates: [
      { kupno: 3.5983, sprzedaż: 3.5271, name: "2018-05-07" },
      { kupno: 3.6088, sprzedaż: 3.5374, name: "2018-05-08" }
    ], detailsInputError: false, detailsInputErrorMessage: '' };

    expect(reducer(startState, {  
      type: RESET
    })).toEqual(initialState);
  });
});