import axios from 'axios';

import getUniqueId from '../../Services/uniqueIdGenerator';
import callApi from '../../Services/apiCaller';
import { fetchUsers } from '../../Login/LoginActions';

export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_ERROR = 'ADD_CARD_ERROR';
export const DELETE_CARD = 'DELETE_CARD';
export const SHOW_DETAILS = 'SHOW_DETAILS';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SEARCH_INPUT_ERROR = 'SEARCH_INPUT_ERROR';
export const GET_CURRENCIES_TABLE = 'GET_CURRENCIES_TABLE';
export const POPULATE_CARDS = 'POPULATE_CARDS';

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function addCardError() {
  return {
    type: ADD_CARD_ERROR,
  }
}

export function addCardRequest(card, userName, isSignedIn, cards) {
  return (dispatch) => {
    const cardExists = cards.find(cardFromCardsArray => cardFromCardsArray.code === card.code);
    if (cardExists) {
      return dispatch(addCardError());
    } else {
      const id = getUniqueId();
      if (isSignedIn) {
        return callApi('card', 'post', { card: { ...card, id }, userName }).then(res => {
          dispatch(addCard({ ...card, id }));
          dispatch(fetchUsers());
        });
      } else {
        return dispatch(addCard({ ...card, id }));
      }
      }
  };
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
  };
}

export function getCurrencyRequest(currencyCode) {
  return (dispatch) => {
    return axios.get(`https://api.nbp.pl/api/exchangerates/rates/c/${currencyCode}/today/`)
      .then(res => {
        dispatch(getCurrency(res.data));
      })
      .catch(() => {
        dispatch(searchInputError());
      });
  }
}

export function getCurrenciesTable(table) {
  return {
    type: GET_CURRENCIES_TABLE,
    table,
  };
}

export function getCurrenciesTableRequest() {
  return (dispatch) => {
    return axios.get(`https://api.nbp.pl/api/exchangerates/tables/c/today/`)
     .then(res => {
       dispatch(getCurrenciesTable(res.data));
     });
  }
}

export function populateCards(cards) {
  return {
    type: POPULATE_CARDS,
    cards
  };
}