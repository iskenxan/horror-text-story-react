import { saveProfileImage } from "../../api/user";
import { getErrorResponse } from "../../api/utils";

export const SAVE_PROFILE_IMAGE_SUCCESS = 'upload_profile_image_success_action';
export const SAVE_PROFILE_IMAGE_ERROR = 'upload_profile_image_error_action';


const saveProfileSucces = (url) => ({
  type: SAVE_PROFILE_IMAGE_SUCCESS,
  payload: url
});


const saveProfileError = (error) => ({
  type: SAVE_PROFILE_IMAGE_ERROR,
  payload: error
});


export const saveProfileImageAction = (base64, token) => (dispatch => {
  saveProfileImage(base64, token).then(response => {
    dispatch(saveProfileSucces(response.result));
  }).catch(error => dispatch(saveProfileError(getErrorResponse(error))));
});