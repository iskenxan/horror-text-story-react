import axios from 'axios';

const apiBaseUrl = 'http://localhost:3001';

const loginUrl = `${apiBaseUrl}/user/login`;
const signUpUrl = `${apiBaseUrl}/user/signup`;


export const login = (username, password) => {
  return axios.post(loginUrl, {
    username,
    password
  });
};


export const signUp = (username, password) => {
  return axios.post(signUpUrl, {
    username,
    password
  })
};


