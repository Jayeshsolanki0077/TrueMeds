import authActions from './authReducer';

const INITIAL_STATE = {
    loginInProgress: false,
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case authActions.LOGIN_REQUEST:
        sessionStorage.clear();
        return { ...state, loginInProgress: true };
      case authActions.LOGIN_SUCCESS:
        return {
          ...state,
          loginInProgress: false,
        };
      default:
        return state;
    }
  }
  