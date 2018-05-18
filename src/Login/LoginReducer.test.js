import reducer, { initialState } from './LoginReducer';
import { SIGN, SIGN_ERROR, REGISTER_USER, POPULATE_USERS } from './LoginActions';

describe('Login component reducer', () => {
  it('should return initial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle sign error', () => {
    const expectedState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: false,
      userSignedIn: '',
      users: [],
    };

    const startState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: false,
      userSignedIn: '',
      users: [],
    };

    expect(reducer(startState, {
      type: SIGN_ERROR,
      signingErrorMessage: 'error'
    })).toEqual(expectedState);
  });

  it('should handle sign in', () => {
    const user = { userName: 'User', pass: 'pass' };
    const user2 = { userName: 'User2', pass: 'pass2'};
    const isSignedIn = false;

    const expectedState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: true,
      userSignedIn: user.userName,
      users: [user],
    };

    const startState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: false,
      userSignedIn: '',
      users: [user],
    };

    expect(reducer(startState, {
      type: SIGN,
      isSignedIn,
      user
    })).toEqual(expectedState);

    startState.users = [user, user2];
    expectedState.users = [user, user2];

    expect(reducer(startState, {
      type: SIGN,
      isSignedIn,
      user
    })).toEqual(expectedState);
  });

  it('should handle sign out', () => {
    const user = { userName: 'User', pass: 'pass' };
    const user2 = { userName: 'User2', pass: 'pass2'};
    const isSignedIn = true;

    const expectedState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: false,
      userSignedIn: '',
      users: [user, user2],
    };

    const startState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: true,
      userSignedIn: user.userName,
      users: [user, user2],
    };

    expect(reducer(startState, {
      type: SIGN,
      isSignedIn,
      user
    })).toEqual(expectedState);
  });

  it('should handle sign up', () => {
    const user = { userName: 'User2', pass: 'pass' };
    const userName = 'User';

    const expectedState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: true,
      userSignedIn: userName,
      users: [user],
    };

    const startState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: false,
      userSignedIn: '',
      users: [user],
    };

    expect(reducer(startState, {
      type: REGISTER_USER,
      userName
    })).toEqual(expectedState);
  });

  it('should replace users array', () => {
    const user = { userName: 'User', pass: 'pass' };
    const user2 = { userName: 'User2', pass: 'pass2' };
    const user3 = { userName: 'User3', pass: 'pass3' };

    const expectedState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: true,
      userSignedIn: user.userName,
      users: [user, user2],
    };

    const startState = {
      signingError: false,
      signingErrorMessage: '',
      signedIn: true,
      userSignedIn: user.userName,
      users: [],
    };

    expect(reducer(startState, {
      type: POPULATE_USERS,
      users: { users: [user, user2] }
    })).toEqual(expectedState);

    startState.users = [user3];

    expect(reducer(startState, {
      type: POPULATE_USERS,
      users: { users: [user, user2] }
    })).toEqual(expectedState);
  });

  it('should return existing user array (and rest of the state) if no users are passed', () => {
    const user = { userName: 'User', pass: 'pass' };

    const expectedState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: false,
      userSignedIn: '',
      users: [],
    };

    const startState = {
      signingError: true,
      signingErrorMessage: 'error',
      signedIn: false,
      userSignedIn: '',
      users: [],
    };

    expect(reducer(startState, {
      type: POPULATE_USERS,
      users: []
    })).toEqual(expectedState);

    startState.users = [user];
    expectedState.users = [user];

    expect(reducer(startState, {
      type: POPULATE_USERS,
      users: []
    })).toEqual(expectedState);
  }); 
});