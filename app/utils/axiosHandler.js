import history from './history';

export function handleSuccess(response) {
  return { data: response.data };
}

export function handleError(error) {
  if (error.message === 'Network Error') {
    // The user doesn't have internet
    return Promise.reject(error);
  }
  switch (error.response.status) {
    case 400:
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error
      ) {
        console.log(error.response.data.error);
      }
      break;
    case 401:
      history.push('/login');

      break;
    case 422:
      if (
        error.response &&
        error.response.status === 422 &&
        error.response.data.error
      ) {
        console.log(error.response.data.error);
      }
      break;
    case 404:
      // Show 404 page

      break;
    case 500:
      // Serveur Error redirect to 500

      break;
    default:
      // Unknow Error
      break;
  }
  return Promise.reject(error);
}
