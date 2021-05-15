import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authJsonHeader } from '../utils/auth-header';
import { apiUrl } from '../config';

export const planService = {
  getAll,
};

function getAll() {
  const url = apiUrl + 'plans';
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authJsonHeader() });
}
export default planService;
