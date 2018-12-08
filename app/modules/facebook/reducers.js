import { LOGIN_STATUS_CHANGED, ERROR_SET } from './types';

const INITIAL_STATE = {
  email: '',
  emailReset: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
  user: null,
  error: '',
  fontLoaded: false,
  loginStatus: 'initial',
  loadWelcome: false,
};

const RESET_STATE = {
  email: '',
  emailReset: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_SET:
      return { ...state, error: action.payload };
    case LOGIN_STATUS_CHANGED:
      console.log('AuthReducer: LOGIN_STATUS_CHANGED');
      if (action.payload == 'notloggedin') {
        console.log('Auth reducer: notloggedin');
        return {
          ...state,
          loginStatus: action.payload,
          email: '',
          password: '',
          phone: '',
          firstname: '',
          lastname: '',
          error: '',
          user: null,
        };
      }
      return { ...state, loginStatus: action.payload };
      
    default:
      return state;
  }
};
