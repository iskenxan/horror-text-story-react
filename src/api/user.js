import axios from 'axios';

const apiBaseUrl = 'http://localhost:3001';

const loginUrl = `${apiBaseUrl}/user/login`;
const logoutUrl = `${apiBaseUrl}/user/logout`;
const signUpUrl = `${apiBaseUrl}/user/signup`;
const saveDraftUrl = `${apiBaseUrl}/user/posts/draft/save`;
const getDraftUrl = `${apiBaseUrl}/user/posts/draft/get`;


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


