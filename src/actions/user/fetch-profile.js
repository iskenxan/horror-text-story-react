export const FETCH_PROFILE_LOADING = 'fetch_profile_loading';
export const FETCH_PROFILE_SUCCESS = 'fetch_profile_success';
export const FETCH_PROFILE__ERROR = 'fetch_profile_error';


const fetchLoading = () => ({
  type: FETCH_PROFILE_LOADING
});


const signupSuccess = (user) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: user
});


const signupError = (error) => ({
  type: FETCH_PROFILE__ERROR,
  payload: error
});


export const fetchProfileAction = (token) => (dispatch => {
  dispatch(fetchLoading());
  signUp(username, password, repeatPassword).then(response => {
    dispatch(signupSuccess(response.data.result));
  }).catch(error =>{
    dispatch(signupError(error.response.data.error.message));
  });
});