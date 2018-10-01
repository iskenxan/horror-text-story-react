import { signUp } from "../../api/user";

const SIGNUP_LOADING = 'signup_loading';
const SIGNUP_SUCCESS = 'signup_success';
const SIGNUP_ERROR = 'signup_error';


const sigupLoading = () => ({
  type: SIGNUP_LOADING
});


const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user
});


const signupError = (error) => ({
  type: SIGNUP_ERROR,
  payload: error
});


export const signupAction = (username, password) => (dispatch => {
  dispatch(sigupLoading());
  signUp(username, password).then(user =>{
    dispatch(signupSuccess(user));
  }).catch(error =>{
    dispatch(signupError(error));
  });
});