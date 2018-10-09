import {
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actions/user/login';
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from '../actions/user/signup';
import {
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from '../actions/user/logout';

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return { ...state, authError: action.payload };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, authError: null };
    case LOGOUT_ERROR:
      return { ...state, logoutError: action.payload };
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default UserReducer;