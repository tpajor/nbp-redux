import callApi from '../Services/apiCaller';
import { populateCards } from '../Nbp/Search/SearchActions';
import { resetDetailState } from '../Nbp/Detail/DetailActions';

export const SIGN = 'SIGN';
export const SIGN_ERROR = 'SIGN_IN_ERROR';
export const REGISTER_USER = 'REGISTER_USER';
export const POPULATE_USERS = 'POPULATE_USERS';

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
      dispatch(sign(isSignedIn, null));
      dispatch(populateCards([]));
      dispatch(resetDetailState());
    } else {
      const user = users.find(user => user.userName === userName);
      if (user) {
        if (user.pass === pass) {
          dispatch(sign(isSignedIn, user));
          dispatch(populateCards(user.cards));
          dispatch(resetDetailState());
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
    const user = users.find(user => user.userName === userName);
    if (user) {
      return dispatch(signError('Użytkownik już istnieje'));
    } else {
      if (pass !== repeatPass) {
        return dispatch(signError('Hasło nie pasuje do powtórzonego hasła'));
      } else {
        return callApi('user', 'post', { userName, pass, repeatPass }).then(res => {
          dispatch(fetchUsers());
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