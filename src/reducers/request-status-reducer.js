import {
  LOGIN_ERROR,
} from '../actions/user/login';
import {
  SIGNUP_ERROR,
} from '../actions/user/signup';
import {
  SAVE_DRAFT_ERROR,
  SAVE_DRAFT_SUCCESS,
  GET_DRAFT_ERROR,
  GET_DRAFT_SUCCESS,
  UPDATE_DRAFT_SUCCESS,
  UPDATE_DRAFT_ERROR,
  DELETE_DRAFT_SUCCESS,
  DELETE_DRAFT_ERROR,
  PUBLISH_DRAFT_ERROR,
  PUBLISH_DRAFT_SUCCESS
} from "../actions/user/new-post";
import { RESET_REQUEST_STATE} from "../actions/request-status-actions";

const initialState = {
  error: false,
  errorMessage: null,
  success: false,
  type: null,
};


const RequestStatusReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case SAVE_DRAFT_ERROR:
    case GET_DRAFT_ERROR:
    case DELETE_DRAFT_ERROR:
    case PUBLISH_DRAFT_ERROR:
    case UPDATE_DRAFT_ERROR: {
      return { error: true, success: false, errorMessage: action.payload, type: action.type };
    }
    case SAVE_DRAFT_SUCCESS:
    case GET_DRAFT_SUCCESS:
    case DELETE_DRAFT_SUCCESS:
    case PUBLISH_DRAFT_SUCCESS:
    case UPDATE_DRAFT_SUCCESS: {
      return { error: false, success: true, errorMessage: null, type: action.type };
    }
    case RESET_REQUEST_STATE: {
      return { ...initialState };
    }
    default: {
      return { ...state }
    }
  }
};


export default RequestStatusReducer;