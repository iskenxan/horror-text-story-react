import _ from 'lodash';
import {
  LOGIN_SUCCESS
} from '../actions/user/login';
import {
  SIGNUP_SUCCESS
} from '../actions/user/signup';
import {
  LOGOUT_SUCCESS
} from '../actions/user/logout';
import {
  ADD_CHARACTER,
  REMOVE_CHARACTER,
  ADD_DIALOG,
  CANCEL_STORY,
  SAVE_TITLE,
  SAVE_DRAFT_SUCCESS,
  GET_DRAFT_SUCCESS,
  UPDATE_DRAFT_SUCCESS, DELETE_DRAFT_SUCCESS,
  PUBLISH_DRAFT_SUCCESS,
  GET_PUBLISHED_SUCCESS,
  UNPUBLISH_SUCCESS,
} from "../actions/user/new-post";
import {
  SAVE_PROFILE_IMAGE_SUCCESS
} from "../actions/user/profile-image";

const emptyStory = {
  characters: {},
  dialog: {},
  dialogCount: 0,
  title: null,
  id: undefined
};


const initialState = {
  user: null,
  token: null,
  newStory: { ...emptyStory },
  stories: {
    published: {},
    drafts: {}
  }
};


const UserReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS: {
      let stateClone = {...state, ...action.payload, logoutError: null };
      stateClone.stories.drafts = action.payload.user.draftRefs;
      stateClone.stories.published = action.payload.user.publishedRefs;
      delete stateClone.user.draftRefs;
      delete stateClone.user.publishedRefs;

      return { ...stateClone };
    }
    case LOGOUT_SUCCESS:
      return { ...initialState };
    case ADD_CHARACTER:
      const newCharactersObj = { ...state.newStory.characters };
      const { name, dialogColor, isMain } = action.payload;
      newCharactersObj[name] = { color:dialogColor, isMain};
      return { ...state, newStory: { ...state.newStory, characters: newCharactersObj } };
    case REMOVE_CHARACTER: {
      const { name } = action.payload;
      const newCharactersObj = { ...state.newStory.characters };
      delete newCharactersObj[name];
      return { ...state, newStory: { ...state.newStory, characters: newCharactersObj } };
    }
    case ADD_DIALOG: {
      const { id, name, text, timestamp } = action.payload;
      const newStoryObj = _.cloneDeep(state.newStory);
      newStoryObj.dialog[id] = { name, text, timestamp };
      newStoryObj.dialogCount ++;
      return { ...state, newStory: { ...newStoryObj } };
    }
    case CANCEL_STORY: {
      return {...state, newStory: { ...emptyStory } };
    }
    case SAVE_TITLE: {
      const newStoryObj = _.cloneDeep(state.newStory);
      newStoryObj.title = action.payload;
      return { ...state, newStory: { ...newStoryObj } }
    }
    case UPDATE_DRAFT_SUCCESS:
    case SAVE_DRAFT_SUCCESS: {
      const storiesClone = _.cloneDeep(state.stories);
      const {id: draftId } = action.payload;
      storiesClone.drafts[draftId] = action.payload
      return { ...state, stories: { ...storiesClone }, newStory: { ...emptyStory } };
    }
    case GET_PUBLISHED_SUCCESS:
    case GET_DRAFT_SUCCESS: {
     return { ...state, newStory: action.payload };
    }
    case DELETE_DRAFT_SUCCESS: {
      const storiesClone = _.cloneDeep(state.stories);
      delete storiesClone.drafts[action.payload];
      return { ...state, stories: { ...storiesClone }, newStory: { ...emptyStory } };
    }
    case PUBLISH_DRAFT_SUCCESS: {
      const storiesClone = _.cloneDeep(state.stories);
      const { newStory } = state;
      const { published, oldDraft } = action.payload;
      storiesClone.published[published] = { title: newStory.title };
      delete storiesClone.drafts[oldDraft];
      return { ...state, stories: { ... storiesClone }, newStory: { ...emptyStory }}
    }
    case UNPUBLISH_SUCCESS : {
      const postId = action.payload;
      const storiesClone = _.cloneDeep(state.stories);
      const storyRef = { ... storiesClone.published[postId] };
      delete storiesClone.published[postId];
      storiesClone.drafts[postId] = { ...storyRef };
      return { ...state, stories: { ...storiesClone }, newStory: { ...emptyStory }}
    }
    case SAVE_PROFILE_IMAGE_SUCCESS: {
      const stateClone = _.cloneDeep(state);
      stateClone.user.user.profileImage = action.payload;
      return { ...stateClone };
    }
    default:
      return state;
  }
};

export default UserReducer;