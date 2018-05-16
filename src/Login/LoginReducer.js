import { SIGN, SIGN_ERROR, REGISTER_USER, POPULATE_USERS } from './LoginActions';

const initialState = {
  signingError: false,
  signingErrorMessage: '',
  signedIn: false,
  userSignedIn: '',
  users: [],
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case SIGN_ERROR: {
      return { ...state, signingError: true, signingErrorMessage: action.signingErrorMessage };
    }

    case SIGN: {
      if (action.isSignedIn) {
        return { ...initialState, users: state.users };
      } else {
        return { ...initialState, signedIn: true, userSignedIn: action.user.userName, users: state.users };
      }
    }

    case REGISTER_USER: {
      return { ...state, signedIn: true, userSignedIn: action.userName, users: state.users };
    }

    case POPULATE_USERS: {
      if (action.users.users) {
        return { ...state, users: action.users.users };
      }
      return { ...state };
    }
    
    default: {
      return { ...state };
    }
  }
}