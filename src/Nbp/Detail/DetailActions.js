import axios from 'axios';

export const GET_INPUTED_NUMBER_OF_LAST_RATES = 'GET_INPUTED_NUMBER_OF_LAST_RATES';
export const DETAIL_INPUT_ERROR = 'DETAIL_INPUT_ERROR';
export const RESET = 'RESET';

export function getInputedNumberOfLastRates(arrayOfLastRates) {
  return {
    type: GET_INPUTED_NUMBER_OF_LAST_RATES,
    lastRates: arrayOfLastRates,
  };
}

export function detailInputError(detailsInputErrorMessage) {
  return {
    type: DETAIL_INPUT_ERROR,
    detailsInputErrorMessage,
  }
}

export function getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode) {
  return (dispatch) => {
    if (isNaN(numberOfRates)) {
      dispatch(detailInputError('Wpisz liczbę'));
    } else if (numberOfRates > 250 || numberOfRates <= 0) {
      dispatch(detailInputError('Maksymalna liczba notowań to 250'));
    } else {
      axios.get(`https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/${numberOfRates}/`)
        .then(res => {
          dispatch(getInputedNumberOfLastRates(res.data));
        })
        .catch(() => {
          dispatch(detailInputError('Błąd serwera. Spróbuj ponownie'))
        });
    }
  }
}

export function resetDetailState() {
  return {
    type: RESET,
  };
}