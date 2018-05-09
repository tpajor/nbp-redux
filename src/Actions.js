import axios from 'axios';
import uuid from 'uuid';

export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const SHOW_DETAILS = 'SHOW_DETAILS';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_INPUTED_NUMBER_OF_LAST_RATES = 'GET_INPUTED_NUMBER_OF_LAST_RATES';
export const SIGN_IN_AND_OUT = 'SIGN_IN_AND_OUT';
export const REGISTER_USER = 'REGISTER_USER';

export function addCard(card) {
  return {
    type: ADD_CARD,
    card: card,
    id: uuid.v4(),
  };
}

export function deleteCard(cardId) {
  return {
    type: DELETE_CARD,
    cardId: cardId,
  };
}

export function showDetails(currencyCode) {
  return {
    type: SHOW_DETAILS,
    currencyCodeToViewInDetail: currencyCode,
  };
}

export function getCurrency(card, searchError, searchErrorMessage) {
  return {
    type: GET_CURRENCY,
    temporaryCard: card,
    searchError: searchError,
    searchErrorMessage: searchErrorMessage,
  };
}

export function getCurrencyRequest(currencyCode) {
  return (dispatch) => {
    if (currencyCode.length > 3 || currencyCode.length < 3) {
      dispatch(getCurrency(null, true, 'Wpisz trzyliterowy kod waluty, np. "USD", "chf"'));
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
        .then(res => {
          dispatch(getCurrency(res.data, false, ''));
        })
        .catch(() => {
          dispatch(getCurrency(null, true, 'Brak notowań waluty lub nieprawidłowy kod waluty'));
        });
    }
  }
}

export function getInputedNumberOfLastRates(arrayOfLastRates, detailsInputError, detailsInputErrorMessage) {
  return {
    type: GET_INPUTED_NUMBER_OF_LAST_RATES,
    lastRates: arrayOfLastRates,
    detailsInputError: detailsInputError,
    detailsInputErrorMessage: detailsInputErrorMessage,
  };
}

export function getInputedNumberOfLastRatesRequest(numberOfRates, currencyCode) {
  return (dispatch) => {
    if (isNaN(numberOfRates)) {
      dispatch(getInputedNumberOfLastRates([], true, 'Wpisz liczbę'));
    } else if (numberOfRates > 250 || numberOfRates <= 0) {
      dispatch(getInputedNumberOfLastRates([], true, 'Maksymalna liczba notowań to 250'));
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/${numberOfRates}/`)
        .then(res => {
          dispatch(getInputedNumberOfLastRates(res.data, false, ''));
        })
        .catch(() => {
          dispatch(getInputedNumberOfLastRates([], true, 'Błąd serwera. Spróbuj ponownie'))
        });
    }
  }
}

export function signInOrOut(isSignedIn, userName, pass) {
  return {
    type: SIGN_IN_AND_OUT,
    isSigningIn: isSignedIn,
    userName,
    pass,
  };
}

export function registerUser(userName, pass, repeatPass) {
  return {
    type: REGISTER_USER,
    userName,
    pass,
    repeatPass,
  };
}