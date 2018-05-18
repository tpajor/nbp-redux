import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';

import { SIGN, SIGN_ERROR, REGISTER_USER, POPULATE_USERS,
  sign, signError, signInOrOut, registerUser, registerUserRequest,
  populateUsers, fetchUsers } from './LoginActions';

jest.mock('../Services/apiCaller');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Component Actions', () => {
  describe('should create', () => {
    it('sing in/out action', () => {
      const isSignedIn = true;
      const user = { name: "Name", pass: "password" , cards: [{code: "PLN", lastRates: []}]};
      const expectedAction = {
        type: SIGN,
        isSignedIn,
        user
      }
      expect(sign(isSignedIn, user)).toEqual(expectedAction);
    });

    it('singError action', () => {
      const signingErrorMessage = 'Error';
      const expectedAction = {
        type: SIGN_ERROR,
        signingErrorMessage
      }
      expect(signError(signingErrorMessage)).toEqual(expectedAction);
    });

    it('registerUser action', () => {
      const userName = 'Name';
      const expectedAction = {
        type: REGISTER_USER,
        userName,
      }
      expect(registerUser(userName)).toEqual(expectedAction);
    });

    it('singError action', () => {
      const signingErrorMessage = 'Error';
      const expectedAction = {
        type: SIGN_ERROR,
        signingErrorMessage
      }
      expect(signError(signingErrorMessage)).toEqual(expectedAction);
    });

    it('poplulateUsers action', () => {
      const users = [{name: "Name1", pass:"password1"}, {name: "Name2", pass: "password2"}];
      const expectedAction = {
        type: POPULATE_USERS,
        users
      }
      expect(populateUsers(users)).toEqual(expectedAction);
    });
  });

  describe('should prepare data', () => {
    it('for populating users', async () => {
      const store = mockStore({ users: [] });
      const url = `http://localhost:8000/api/user`;
      const options = { body: undefined, headers: { 'content-type': 'application/json' }, method: "get" };
      const expectedResponse = {users: [{name: "Name1", pass:"password1"}, {name: "Name2", pass: "password2"}]};
      const expectedAction = {
        type: POPULATE_USERS,
        users: expectedResponse,
      }
      fetch.__fetchUsers(expectedResponse);
      store.dispatch(fetchUsers()).then(() => {
        expect(fetch).toHaveBeenCalledWith(url, options);
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });

    describe('for user registering', () => {
      it('with success', async () => {
        const store = mockStore({ userName: '', signingErrorMessage: '' });
        const url = `http://localhost:8000/api/user`;
        const userName = "User3";
        const pass = "pass";
        const repeatPass = "pass";
        const users = [{ userName: "User", pass: "pass" }, { userName: "User2", pass: "pass2" }];
        const options = { body: { pass, repeatPass, userName }, 
          headers: { 'content-type': 'application/json' }, 
          method: "post" 
        };
        const expectedAction = {
          type: REGISTER_USER,
          userName
        };
        store.dispatch(registerUserRequest(userName, pass, repeatPass, users)).then(() => {
          expect(fetch).toHaveBeenCalledWith(url, options);
          options.body = undefined;
          options.method = "get";
          expect(fetch).toHaveBeenCalledWith(`http://localhost:8000/api/user`, options)
          expect(store.getActions()).toEqual([expectedAction]);
        });
      });
  
      it('but fail due to user already existing', () => {
        const store = mockStore({ userName: '', signingErrorMessage: '' });
        const userName = "User";
        const pass = "pass";
        const repeatPass = "pass";
        const users = [{ userName: "User", pass: "pass" }, { userName: "User2", pass: "pass2" }];
        const expectedAction = {
          type: SIGN_ERROR,
          signingErrorMessage: 'Użytkownik już istnieje'
        };
        store.dispatch(registerUserRequest(userName, pass, repeatPass, users));
        expect(store.getActions()).toEqual([expectedAction]);
      });

      it('but fail due to passwor not matching', () => {
        const store = mockStore({ userName: '', signingErrorMessage: '' });
        const userName = "User3";
        const pass = "pass1";
        const repeatPass = "pass";
        const users = [{ userName: "User", pass: "pass" }, { userName: "User2", pass: "pass2" }];
        const expectedAction = {
          type: SIGN_ERROR,
          signingErrorMessage: 'Hasło nie pasuje do powtórzonego hasła'
        };
        store.dispatch(registerUserRequest(userName, pass, repeatPass, users));
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });

    describe('for signing Action', () => {
      it('when signing out', () => {
        const store = mockStore({ users: [], isSignedIn: false, signingErrorMessage: '' });
        const isSignedIn = true;
        const expectedAction = {
          type: SIGN,
          isSignedIn: true,
          user: null
        };
        store.dispatch(signInOrOut(isSignedIn));
        expect(store.getActions()).toContainEqual(expectedAction);
        expect(store.getActions()).toContainEqual({ type: 'RESET' });
        expect(store.getActions()).toContainEqual({ type: 'POPULATE_CARDS', cards: [] });
      });

      it('when signing in', () => {
        const store = mockStore({ users: [], isSignedIn: false, signingErrorMessage: '' });
        const isSignedIn = false;
        const user = { userName: "User", pass: "pass" };
        const users = [user, { userName: "User2", pass: "pass2" }];
        const userName = user.userName;
        const pass = user.pass;
        const expectedAction = {
          type: SIGN,
          isSignedIn: false,
          user
        };
        store.dispatch(signInOrOut(isSignedIn, userName, pass, users));
        expect(store.getActions()).toContainEqual(expectedAction);
        expect(store.getActions()).toContainEqual({ type: 'RESET' });
        expect(store.getActions()).toContainEqual({ type: 'POPULATE_CARDS', cards: undefined });
      });

      it('but fail due to no such user', () => {
        const store = mockStore({ users: [], isSignedIn: false, signingErrorMessage: '' });
        const isSignedIn = false;
        const user = { userName: "User", pass: "pass" };
        const users = [user, { userName: "User2", pass: "pass2" }];
        const userName = "User3";
        const pass = user.pass;
        const expectedAction = {
          type: SIGN_ERROR,
          signingErrorMessage: 'Brak takiego użytkownika'
        };
        store.dispatch(signInOrOut(isSignedIn, userName, pass, users));
        expect(store.getActions()).toContainEqual(expectedAction);
      });

      it('but fail due to wrong password', () => {
        const store = mockStore({ users: [], isSignedIn: false, signingErrorMessage: '' });
        const isSignedIn = false;
        const user = { userName: "User", pass: "pass" };
        const users = [user, { userName: "User2", pass: "pass2" }];
        const userName = user.userName;
        const pass = "pass3";
        const expectedAction = {
          type: SIGN_ERROR,
          signingErrorMessage: 'Niepoprawne Hasło'
        };
        store.dispatch(signInOrOut(isSignedIn, userName, pass, users));
        expect(store.getActions()).toContainEqual(expectedAction);
      });
    });
  });
});