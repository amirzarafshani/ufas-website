import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authJsonHeader } from '../utils/auth-header';
import { apiUrl } from '../config';

export const cartService = { getAll, addToCart, updateItem, removeItem };

function getAll() {
  const url = apiUrl + 'carts';
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authJsonHeader() });
}
function addToCart(obj) {
  const url = apiUrl + 'carts';
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, obj, { headers: authJsonHeader() });
}
function updateItem(itemId, obj) {
  const url = apiUrl + 'carts/' + itemId;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, obj, { headers: authJsonHeader() });
}
function removeItem(itemId) {
  const url = apiUrl + 'carts/' + itemId;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.delete(url, { headers: authJsonHeader() });
}
export default cartService;
