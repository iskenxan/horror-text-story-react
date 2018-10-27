import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import RequestStatusReducer from './request-status-reducer';

export default combineReducers({
  user: UserReducer,
  requestStatus: RequestStatusReducer
});