import { signUp } from "../../api/user";

export const SIGNUP_LOADING = 'signup_loading';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_ERROR = 'signup_error';


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


export const signupAction = (username, password, repeatPassword) => (dispatch => {
  dispatch(sigupLoading());
  signUp(username, password, repeatPassword).then(response => {
    dispatch(signupSuccess(response.data.result));
  }).catch(error =>{
    dispatch(signupError(error.response.data.error.message));
  });
});