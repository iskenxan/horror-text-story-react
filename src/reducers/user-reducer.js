import _ from 'lodash';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actions/user/login';
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from '../actions/user/signup';
import {
  LOGOUT_ERROR,
  LOGOUT_SUCCESS
} from '../actions/user/logout';
import {
  ADD_CHARACTER,
  REMOVE_CHARACTER,
  ADD_DIALOG,
  CANCEL_STORY,
  SAVE_TITLE,
  SAVE_DRAFT_ERROR,
  SAVE_DRAFT_SUCCESS,
  GET_DRAFT_ERROR,
  GET_DRAFT_SUCCESS,
} from "../actions/user/new-post";

const emptyStory = {
  characters: {},
  dialog: {},
  dialogCount: 0,
  title: null,
};


const initialState = {
  user: null,
  token: null,
  newStory: { ...emptyStory },
  stories: {
    published: [],
    drafts: []
  }
};


const UserReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return { ...state, authError: action.payload };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, authError: null };
    case LOGOUT_ERROR:
      return { ...state, logoutError: action.payload };
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
      const { id, name, text } = action.payload;
      const newStoryObj = _.cloneDeep(state.newStory);
      newStoryObj.dialog[id] = { name, text };
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
    case SAVE_DRAFT_SUCCESS: {
      const storiesClone = _.cloneDeep(state.stories);
      const { newStory } = state;
      storiesClone.drafts.push({
        title: newStory.title,
        id: action.payload
      });

      return { ...state, stories: { ...storiesClone }, newStory: { ...emptyStory } };
    }
    case GET_DRAFT_ERROR:
    case SAVE_DRAFT_ERROR: {
      return { ...state, requestError: action.payload };
    }
    case GET_DRAFT_SUCCESS: {
     return { ...state, newStory: action.payload };
    }

    default:
      return state;
  }
};

export default UserReducer;