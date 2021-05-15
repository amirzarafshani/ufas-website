import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCart } from '../actions/cartActions';

const withCart = (WrappedComponent) => {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};

export default withCart;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCart,
    },
    dispatch,
  );

function mapStateToProps(state) {
  const { cart } = state.cartReducer;
  return { cart };
}
