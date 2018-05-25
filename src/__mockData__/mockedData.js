const card = { id: 'someId', code: 'USD', currency: 'dolar amerykański', rates: [{ ask: 3.3, bid: 3.4 }]};
const card2 = { id: 'someId2', code: 'USD', currency: 'dolar amerykański', rates: { ask: 3.3, bid: 3.4 }};

const search = {
  cards: [card, card2],
  temporaryCard: card,
  searchError: false,
  addCardError: true,
  addCardErrorMessage: 'error',
  currenciesTable: ['usd', 'chf', 'aud'],
  currencyCodeToViewInDetail: 'usd',
};

const user = { userName: 'User', pass: 'pass' };
const user2 = { userName: 'User2', pass: 'pass2'};

export const login = {
  signingError: true,
  signingErrorMessage: 'error',
  signedIn: true,
  userSignedIn: 'User',
  users: [user, user2]
};

const lastRates = [
  { ask: 3.5983, bid: 3.5271, effectiveDate: "2018-05-07", no: "087/C/NBP/2018" },
  { ask: 3.6088, bid: 3.5374, effectiveDate: "2018-05-08", no: "088/C/NBP/2018" }
];

const detail = {
  lastRates: lastRates,
  detailsInputError: false,
  detailsInputErrorMessage: '',
};

export const initialState = { search, login, detail };

export const searchViewData = {
  cards: search.cards,
  temporaryCard: search.temporaryCard,
  searchError: search.searchError,
  signedIn: login.signedIn,
  userSignedIn: login.userSignedIn,
  addCardError: search.addCardError,
  addCardErrorMessage: search.addCardErrorMessage,
  currenciesTable: search.currenciesTable,
};

export const detailViewData = {
  currencyCodeToViewInDetail: search.currencyCodeToViewInDetail,
  lastRates: detail.lastRates,
  detailsInputError: detail.detailsInputError,
  detailsInputErrorMessage: detail.detailsInputErrorMessage,
  signedIn: login.signedIn,
};