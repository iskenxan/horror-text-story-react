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


export const logoutAction = (token) => (dispatch => {
  dispatch(logoutLoading());
  logout(token).then(() => {
    dispatch(logoutSuccess());
  }).catch(() => {
    dispatch(logoutSuccess());
  });
});

