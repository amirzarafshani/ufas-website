import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import withCart from '../../components/redux/providers/withCart';
import withAuth from '../../components/redux/providers/withAuth';
import { ReactComponent as Closemenu } from '../../assets/svg/closemenu.svg';
import cartService from '../../services/cartService';

const Cart = (props) => {
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(undefined);
  const [data, setData] = useState([]);

  useState(() => {
    cartService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        props.setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const getCart = () => {
    setLoading(treu);
    cartService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        props.setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleRemoveItem = (itemId) => {
    setItemLoading(itemId);
    cartService
      .removeItem(itemId)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        props.setCart(res.data);
        setItemLoading(undefined);
      })
      .catch((err) => {
        setItemLoading(undefined);
      });
  };

  const handleUpdateQountity = (itemId, newQty) => {
    setItemLoading(itemId);
    let obj = {};
    obj['item_id'] = itemId;
    obj['qty'] = newQty;
    cartService
      .updateItem(itemId, JSON.stringify(obj))
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        props.setCart(res.data);
        setItemLoading(undefined);
      })
      .catch((err) => {
        setItemLoading(undefined);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex shadow-md my-10 border border-gray-100">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {data && data.total_items} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>

              <h3
                className="
          font-semibold
          text-center text-gray-600 text-xs
          uppercase
          w-1/5
          text-center
        "
              >
                Price
              </h3>
              <h3
                className="
          font-semibold
          text-center text-gray-600 text-xs
          uppercase
          w-1/5
          text-center
        "
              >
                Qountity
              </h3>
              <h3
                className="
          font-semibold
          text-center text-gray-600 text-xs
          uppercase
          w-1/5
          text-center
        "
              >
                Total
              </h3>
              <h3
                className="
          font-semibold
          text-center text-gray-600 text-xs
          uppercase
          w-1/5
          text-center
        "
              >
                Remove
              </h3>
            </div>

            {data &&
              data.cart_items &&
              data.cart_items.length > 0 &&
              data.cart_items.map((item, index) => (
                <div
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 relative"
                  key={index}
                >
                  {itemLoading === item.id && (
                    <div className="absolute top-0 left-0 w-full h-full z-50 overflow-hidden bg-gray-100 opacity-75 flex flex-col items-center justify-center">
                      <div className="dot-pulse"></div>
                    </div>
                  )}

                  <div className="flex w-2/5">
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">
                        {item.plan ? item.plan.name : ''}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {item.plan ? item.plan.days + ' Days' : ''}
                      </span>
                    </div>
                  </div>

                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.price}
                  </span>
                  <div className="flex justify-center w-1/5">
                    <a
                      className={`flex items-center ${
                        item.qty > 1 ? 'cursor-pointer' : 'pointer-events-none	'
                      }`}
                      onClick={() =>
                        item.qty > 1 &&
                        handleUpdateQountity(item.id, item.qty - 1)
                      }
                    >
                      <svg
                        className={`fill-current w-3 ${
                          item.qty > 1 ? 'text-gray-600' : 'text-gray-300'
                        }`}
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </a>

                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={item.qty}
                      onChange={(e) =>
                        handleUpdateQountity(item.id, e.target.value)
                      }
                    />
                    <a
                      className="cursor-pointer flex items-center"
                      onClick={() =>
                        handleUpdateQountity(item.id, item.qty + 1)
                      }
                    >
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </a>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ${item.item_price}
                  </span>
                  <a
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-center w-1/5 flex-items-center justify-center cursor-pointer"
                  >
                    <Closemenu className="h-4 w-4 mx-auto" />
                  </a>
                </div>
              ))}

            <Link
              to="/profile"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div
            id="summary"
            className="w-1/4 px-8 py-10 bg-indigo-600 text-white"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {data && data.total_items}
              </span>
              <span className="font-semibold text-sm">
                {data && data.total_price}$
              </span>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${data && data.total_price}</span>
              </div>
              <button
                className="
          bg-indigo-500
          font-semibold
          hover:bg-indigo-700
          py-3
          text-sm text-white
          uppercase
          w-full
        "
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withCart(withAuth(Cart));
