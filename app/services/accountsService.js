import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authJsonHeader } from '../utils/auth-header';
import { apiUrl } from '../config';

export const accountsService = {
  getAll,
  getByid,
};

function getAll() {
  const url = apiUrl + 'accounts';
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authJsonHeader() });
}

function getByid(id) {
  const url = apiUrl + 'accounts/' + id;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authJsonHeader() });
}
export default accountsService;
