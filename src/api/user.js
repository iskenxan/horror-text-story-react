import axios from 'axios';

const apiBaseUrl = 'https://spookies-server.herokuapp.com';

const loginUrl = `${apiBaseUrl}/user/auth/login`;
const logoutUrl = `${apiBaseUrl}/user/auth/logout`;
const signUpUrl = `${apiBaseUrl}/user/auth/signup`;
const saveDraftUrl = `${apiBaseUrl}/user/posts/draft/save`;
const getDraftUrl = `${apiBaseUrl}/user/posts/draft/get`;
const updateDraftUrl = `${apiBaseUrl}/user/posts/draft/update`;
const deleteDraftUrl = `${apiBaseUrl}/user/posts/draft/delete`;
const publishDraftUrl = `${apiBaseUrl}/user/posts/draft/publish`;
const getPublishedUrl = `${apiBaseUrl}/user/posts/published/get`;
const unpublishDraftUrl = `${apiBaseUrl}/user/posts/published/unpublish`;
const saveProfileImageUrl =`${apiBaseUrl}/user/profile/profile-image/save`;


export const logout = (token) => {
  return axios.post(logoutUrl, {
    token
  })
};


export const login = (username, password) => {
  return axios.post(loginUrl, {
    username,
    password
  });
};


export const signUp = (username, password, repeatPassword) => {
  return axios.post(signUpUrl, {
    username,
    password,
    repeatPassword
  });
};


export const saveDraft = (newStory, token) => {
  return axios.post(saveDraftUrl, {
    token,
    draft: newStory
  });
};


export const getDraft = (id, token) => {
  return axios.post(getDraftUrl, {
    token,
    id
  });
};


export const updateDraft = (draft, token) => {
  return axios.post(updateDraftUrl, {
    token,
    draft
  });
};


export const deleteDraft = (id, token) => {
  return axios.post(deleteDraftUrl, {
    id,
    token
  });
};


export const publishDraft = (draft, token) => {
  return axios.post(publishDraftUrl, {
    draft,
    token
  });
};


export const getPublished = (id, token) => {
  return axios.post(getPublishedUrl, {
    id,
    token
  });
};


export const unpublishPost = (id, token) => {
  return axios.post(unpublishDraftUrl, {
    id,
    token
  });
};


export const saveProfileImage = (base64, token) => {
  return axios.post(saveProfileImageUrl, {
    token,
    base64
  });
};


