import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authJsonHeader } from '../utils/auth-header';
import { apiUrl } from '../config';

export const paymentsService = {
  getById,
};

function getById(id) {
  const url = apiUrl + 'payments/' + id;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authJsonHeader() });
}
export default paymentsService;
