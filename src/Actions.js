import axios from 'axios';
import uuid from 'uuid';
import callApi from './apiCaller';

export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const SHOW_DETAILS = 'SHOW_DETAILS';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_INPUTED_NUMBER_OF_LAST_RATES = 'GET_INPUTED_NUMBER_OF_LAST_RATES';
export const SIGN = 'SIGN';
export const REGISTER_USER = 'REGISTER_USER';
export const POPULATE_USERS = 'POPULATE_USERS';
export const SEARCH_INPUT_ERROR = 'SEARCH_INPUT_ERROR';
export const DETAIL_INPUT_ERROR = 'DETAIL_INPUT_ERROR';
export const SIGN_ERROR = 'SIGN_IN_ERROR';

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function addCardRequest(card, userName, isSignedIn) {
  return (dispatch) => {
    const id = uuid.v4();
    if (isSignedIn) {
      return callApi('card', 'post', { card: { ...card, id }, userName }).then(res => {
        dispatch(addCard({ ...card, id }));
        dispatch(fetchUsers());
      });
    } else {
      dispatch(addCard({ ...card, id }));
    }
  }
}

export function deleteCard(cardId) {
  return {
    type: DELETE_CARD,
    cardId: cardId,
  };
}

export function deleteCardRequest(cardId, userName, isSignedIn) {
  return (dispatch) => {
    if (isSignedIn) {
      return callApi('card', 'delete', { cardId, userName }).then(res => {
        dispatch(deleteCard(cardId));
        dispatch(fetchUsers());
      });
    } else {
      dispatch(deleteCard(cardId));
    }
  }
}

export function showDetails(currencyCode) {
  return {
    type: SHOW_DETAILS,
    currencyCodeToViewInDetail: currencyCode,
  };
}

export function getCurrency(card) {
  return {
    type: GET_CURRENCY,
    temporaryCard: card,
  };
}

export function searchInputError(searchErrorMessage) {
  return {
    type: SEARCH_INPUT_ERROR,
    searchErrorMessage,
  };
}


export function getCurrencyRequest(currencyCode) {
  return (dispatch) => {
    if (currencyCode.length > 3 || currencyCode.length < 3) {
      dispatch(searchInputError('Wpisz trzyliterowy kod waluty, np. "USD", "chf"'));
    } else {
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
        .then(res => {
          dispatch(getCurrency(res.data));
        })
        .catch(() => {
          dispatch(searchInputError('Brak notowań waluty lub nieprawidłowy kod waluty'));
        });
    }
  }
}

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
      axios.get(`http://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/last/${numberOfRates}/`)
        .then(res => {
          dispatch(getInputedNumberOfLastRates(res.data));
        })
        .catch(() => {
          dispatch(detailInputError('Błąd serwera. Spróbuj ponownie'))
        });
    }
  }
}

export function sign(isSignedIn, user) {
  return {
    type: SIGN,
    isSignedIn,
    user,
  };
}

export function signError(signingErrorMessage) {
  return {
    type: SIGN_ERROR,
    signingErrorMessage,
  };
}

export function signInOrOut(isSignedIn, userName, pass, users) {
  return (dispatch) => {
    if (isSignedIn) {
      return dispatch(sign(isSignedIn, null));
    } else {
      const user = users.find(user => user.userName === userName);
      if (user) {
        if (user.pass === pass) {
          dispatch(sign(isSignedIn, user));
        } else {
          return dispatch(signError('Niepoprawne Hasło'));
        }
      } else {
        return dispatch(signError('Brak takiego użytkownika'));
      }
    }
  }
}

export function registerUser(userName) {
  return {
    type: REGISTER_USER,
    userName,
  };
}

export function registerUserRequest(userName, pass, repeatPass, users) {
  return (dispatch) => {
    const user = users.find(user => user.userName === user);
    if (user) {
      return dispatch(signError('Użytkownik już istnieje'));
    } else {
      if (pass !== repeatPass) {
        return dispatch(signError('Hasło nie pasuje do powtórzonego hasła'));
      } else {
        return callApi('user', 'post', { userName, pass, repeatPass }).then(res => {
          dispatch(registerUser(userName));
        });
      }
    }
  }
}

export function populateUsers(users) {
  return {
    type: POPULATE_USERS,
    users,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return callApi('user').then(res => {
      dispatch(populateUsers(res));
    })
  }
}