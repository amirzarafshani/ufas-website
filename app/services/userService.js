import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { apiUrl } from '../config';

export const userService = {
  login,
  register,
  activate,
  resendActivatioCode,
  validateReferralCode,
};

function login(dto) {
  const url = apiUrl + 'login';
  axios.interceptors.response.use(handleSuccess, handleError);
  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.post(url, JSON.stringify(dto), { headers: headers });
}

function register(dto) {
  const url = apiUrl + 'register';
  axios.interceptors.response.use(handleSuccess, handleError);
  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.post(url, JSON.stringify(dto), { headers: headers });
}

function activate(dto) {
  const url = apiUrl + 'activate';
  axios.interceptors.response.use(handleSuccess, handleError);
  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.post(url, JSON.stringify(dto), { headers: headers });
}

function resendActivatioCode(dto) {
  const url = apiUrl + 'send_activation_code';
  axios.interceptors.response.use(handleSuccess, handleError);
  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.post(url, JSON.stringify(dto), { headers: headers });
}

function validateReferralCode(code) {
  const url = apiUrl + 'validate_referral_code?referrer_code=' + code;
  axios.interceptors.response.use(handleSuccess, handleError);
  let headers = { 'Content-Type': 'application/json; charset=utf-8' };
  return axios.get(url, { headers: headers });
}

export default userService;
