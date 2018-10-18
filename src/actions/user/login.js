import { login } from '../../api/user';


export const LOGIN_LOADING = 'login_loading';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';


const loginLoading = () => ({
    type: LOGIN_LOADING
});


const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});


const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
});


export const loginAction = (username, password) => (dispatch => {
  dispatch(loginLoading());
  login(username, password).then(response => {
    dispatch(loginSuccess(response.data.result));
  }).catch(error => {
    dispatch(loginError(error.response && error.response.data
      ? error.response.data.error.message : 'Connection problems'));
  });
});

