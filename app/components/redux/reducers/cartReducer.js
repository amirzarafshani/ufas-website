import { SET_CART } from '../actionTypes';

let cart = JSON.parse(localStorage.getItem('cart'));
const initialState = {
  cart: cart ? cart : {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      const { cart } = action.payload;
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart,
      };
    }
    default:
      return state;
  }
}
