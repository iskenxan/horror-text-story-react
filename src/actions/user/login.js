import { login } from '../../api/user';


const LOGIN_LOADING = 'login_loading';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_ERROR = 'login_error';


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
  login(username, password).then(user =>{
    dispatch(loginSuccess(user));
  }).catch(error =>{
    dispatch(loginError(error));
  });
});

