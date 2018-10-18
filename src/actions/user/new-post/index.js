import
{
  saveDraft,
  getDraft
} from '../../../api/user';
import {
  getErrorResponse
} from '../../../api/utils';


export const ADD_CHARACTER = 'add_character_action';
export const REMOVE_CHARACTER = 'remove_character_action';

export const ADD_DIALOG = 'add_dialog_action';
export const REMOVE_DIALOG = 'remove_dialog_action';

export const CANCEL_STORY = 'cancel_story_action';

export const SAVE_TITLE = 'save_title_action';

export const SAVE_DRAFT_SUCCESS = 'save_draft_success_action';
export const SAVE_DRAFT_ERROR = 'save_draft_error_action';

export const GET_DRAFT_SUCCESS = 'get_draft_success_action';
export const GET_DRAFT_ERROR = 'get_draft_error_action';


export const addCharacterAction = (name, dialogColor, isMain) => {
  return ({
    type: ADD_CHARACTER,
    payload: { name, dialogColor, isMain },
  })
};


export const removeCharacterAction = (name) => {
  return ({
    type: REMOVE_CHARACTER,
    payload: { name },
  })
};


export const addDialogMessageAction = (message) => {
  return ({
    type: ADD_DIALOG,
    payload: message
  });
};


export const removeDialogMessageAction = (messageId) => {
  return ({
    type: REMOVE_DIALOG,
    payload: messageId
  });
};


export const cancelStory = () => {
  return ({
    type: CANCEL_STORY,
  })
};


export const saveTitleAction = (title) => ({
  type: SAVE_TITLE,
  payload: title,
});


const saveDraftSuccess = (draftId) => ({
  type: SAVE_DRAFT_SUCCESS,
  payload: draftId
});


const saveDraftError = (error) => ({
  type: SAVE_DRAFT_ERROR,
  payload: error
});


const getDraftSuccess = (draft) =>({
  type: GET_DRAFT_SUCCESS,
  payload: draft
});


const getDraftError = (error) => ({
  type: GET_DRAFT_ERROR,
  payload: error
});


export const saveDraftAction = (newStory, securityToken) => (dispatch => {
  saveDraft(newStory, securityToken).then(response => {
    if (response.data && response.data.result) {
      dispatch(saveDraftSuccess(response.data.result));
    }
  }).catch(error => dispatch(saveDraftError(getErrorResponse(error))));
});


export const getDraftAction = (id, securityToken) => (dispatch => {
  getDraft(id, securityToken).then(response => {
    if (response.data && response.data.result) {
      dispatch(getDraftSuccess(response.data.result))
    }
  }).catch(error => dispatch(getDraftError(getErrorResponse(error))))
});

