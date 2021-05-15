import { LOGIN, LOGOUT } from '../actionTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user ? user : {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case LOGOUT: {
      localStorage.clear();
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
}
