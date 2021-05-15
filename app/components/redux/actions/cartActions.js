import { SET_CART } from '../actionTypes';

export const setCart = (cart) => ({
  type: SET_CART,
  payload: {
    cart,
  },
});
