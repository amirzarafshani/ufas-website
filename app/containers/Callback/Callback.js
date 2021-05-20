import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import paymentsService from '../../services/paymentsService';
import withAuth from '../../components/redux/providers/withAuth';
import withCart from '../../components/redux/providers/withCart';
import history from '../../utils/history';

const Callback = (props) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(undefined);

  useEffect(() => {
    let params = props.match.params;
    console.log(params);
    if (
      params !== undefined &&
      params.status === '1' &&
      params.id !== undefined
    ) {
      getPayment(params.id);
      setPaymentStatus(true);
    } else {
    }
  }, []);

  const getPayment = (id) => {
    setLoading(true);
    paymentsService
      .getById(id)
      .then((res) => {
        let data = res.data;
        console.log(data);
        props.setCart(data.cart);
        setPayment(data.payment);
        setLoading(false);
        if (data.user.active) {
          history.push('/profile');
        } else {
          history.push('/activatuin');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Callback</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-12 py-40">
          <div className="dot-pulse"></div>
        </div>
      ) : paymentStatus ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <div class="success-checkmark">
            <div class="check-icon">
              <span class="icon-line line-tip"></span>
              <span class="icon-line line-long"></span>
              <div class="icon-circle"></div>
              <div class="icon-fix"></div>
            </div>
          </div>
          <div className="font-bold text-2xl text-green-600 mb-4">
            Payment Successful
          </div>
          <div>You can view payment details in your profile</div>
          <Link
            to="/profile"
            className="bg-indigo-600 rounded-lg mt-4 text-white py-2 px-4"
          >
            Go back to Profile
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
            className="failed text-red-600 stroke-current	"
          >
            <circle
              class="path circle"
              fill="none"
              stroke-width="6"
              stroke-miterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <line
              class="path line"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              class="path line"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </svg>
          <div className="font-bold text-2xl text-red-600 mb-4">
            Payment Failed
          </div>
          <div>Please try again after a few minutes</div>
          <Link
            to="/profile"
            className="bg-indigo-600 rounded-lg mt-4 text-white py-2 px-4"
          >
            Go back to Profile
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};

export default withCart(withAuth(Callback));
