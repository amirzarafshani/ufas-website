export function authJsonHeader() {
  // return authorization header with jwt user
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    let token = user.token;
    console.log(token);
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
  } else {
    return {};
  }
}

export function jsonHeader() {
  return {
    'Content-Type': 'application/json',
  };
}
