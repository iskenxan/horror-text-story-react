import
{
  saveDraft,
  getDraft,
  updateDraft,
  deleteDraft,
  publishDraft,
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

export const UPDATE_DRAFT_SUCCESS = 'update_draft_success_action';
export const UPDATE_DRAFT_ERROR = 'update_draft_error_action';

export const DELETE_DRAFT_SUCCESS = 'delete_draft_success_action';
export const DELETE_DRAFT_ERROR = 'delete_draft_error_action';

export const PUBLISH_DRAFT_SUCCESS = 'publish_draft_success_action';
export const PUBLISH_DRAFT_ERROR = 'publish_draft_error_action';


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
  payload: draftId,
});


const saveDraftError = (error) => ({
  type: SAVE_DRAFT_ERROR,
  payload: error,
});


const getDraftSuccess = (draft) =>({
  type: GET_DRAFT_SUCCESS,
  payload: draft,
});


const getDraftError = (error) => ({
  type: GET_DRAFT_ERROR,
  payload: error,
});


const updateDraftError = (error) =>({
  type: UPDATE_DRAFT_ERROR,
  payload: error,
});


const deleteDraftSuccess = (draftId) => ({
  type: DELETE_DRAFT_SUCCESS,
  payload: draftId,
});


const deleteDraftError = (error) => ({
  type: DELETE_DRAFT_ERROR,
  payload: error,
});


const updateDraftSuccess = (draftId) => ({
  type: UPDATE_DRAFT_SUCCESS,
  payload: draftId,
});


const publishDraftSuccess = (postId) => ({
  type: PUBLISH_DRAFT_SUCCESS,
  payload: postId,
});


const publishDraftError = (error) => ({
  type: PUBLISH_DRAFT_ERROR,
  payload: error,
});


export const saveDraftAction = (newStory, securityToken) => (dispatch => {
  saveDraft(newStory, securityToken).then(response => {
    console.log(response.data);
    if (response.data && response.data.result) {
      dispatch(saveDraftSuccess(response.data.result));
    }
  }).catch(error => {
    console.log(error);
    dispatch(saveDraftError(getErrorResponse(error)))
  });
});


export const getDraftAction = (id, securityToken) => (dispatch => {
  getDraft(id, securityToken).then(response => {
    if (response.data && response.data.result) {
      dispatch(getDraftSuccess(response.data.result));
    }
  }).catch(error => dispatch(getDraftError(getErrorResponse(error))))
});


export const updateDraftAction = (draft, securityToken) => (dispatch => {
  updateDraft(draft, securityToken).then(response => {
    if (response.data && response.data.result) {
      dispatch(updateDraftSuccess(response.data.result));
    }
  }).catch(error => dispatch(updateDraftError(getErrorResponse(error))))
});


export const deleteDraftAction = (draftId, securityToken) => (dispatch => {
  deleteDraft(draftId, securityToken).then(response => {
    dispatch(deleteDraftSuccess(response.data.result));
  }).catch(error => dispatch(deleteDraftError(getErrorResponse(error))))
});


export const publishDraftAction = (draft, securityToken) => (dispatch => {
  if (draft.dialogCount <= 2) {
    return dispatch(publishDraftError('Post must have at lest 3 dialog messages'));
  }
  publishDraft(draft, securityToken).then(response => {
    dispatch(publishDraftSuccess(response.data.result));
  }).catch(error => dispatch(publishDraftError(getErrorResponse(error))))
});
