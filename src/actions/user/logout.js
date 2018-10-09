import { logout } from '../../api/user';


export const LOGOUT_LOADING = 'logout_loading';
export const LOGOUT_SUCCESS = 'logout_success';
export const LOGOUT_ERROR = 'logout_error';


const logoutLoading = () => ({
  type: LOGOUT_LOADING
});


const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});


const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  payload: error
});


export const logoutAction = (username, password) => (dispatch => {
  dispatch(logoutLoading());
  logout(username, password).then(() => {
    dispatch(logoutSuccess());
  }).catch(error => {
    dispatch(logoutError(error.response.data.error.message));
  });
});

