import axios from 'axios';

const apiBaseUrl = 'http://localhost:3001';

const loginUrl = `${apiBaseUrl}/user/login`;
const logoutUrl = `${apiBaseUrl}/user/logout`;
const signUpUrl = `${apiBaseUrl}/user/signup`;


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
  })
};


