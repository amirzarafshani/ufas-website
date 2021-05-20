import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';
import { FiCheckCircle } from 'react-icons/fi';
import { BiBlock } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
import AddAccount from './AddAcountModal';
import accountsService from '../../services/accountsService';
import hourglass from '../../assets/images/hourglass.gif';

const Profile = (props) => {
  let [accounts, setAccounts] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    setLoading(true);
    accountsService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between border-gray-100 border-b pb-4">
          <div className="font-bold mb-2 md:mb-0">
            ACCOUNTS
            <span className="ml-2 text-gray-500 font-normal">
              Manage your accounts (Add, Remove or Disable your accounts)
            </span>
          </div>
          <AddAccount />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="dot-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {accounts &&
              accounts.length > 0 &&
              accounts.map((item, index) => (
                <div
                  className={`border h-40 rounded-2xl flex overflow-hidden ${
                    item.active ? 'border-gray-600' : 'border-gray-400'
                  }`}
                  key={index}
                >
                  <div
                    className={`text-white w-1/3 flex flex-col items-center justify-center ${
                      item.active ? 'bg-gray-600' : 'bg-gray-400'
                    }`}
                  >
                    <span className="mb-2">
                      {item.active ? (
                        <FiCheckCircle className="w-6 h-6" />
                      ) : (
                        <BiBlock className="w-6 h-6" />
                      )}
                    </span>
                    <span className="font-bold text-3xl">
                      {item.plan && item.plan.days}
                    </span>
                    <span>Days</span>
                  </div>
                  <div className="flex flex-col items-center justify-evenly text-center w-2/3">
                    <span className="flex items-center">
                      <span className="text-gray-600">Valid to:</span>
                      <span className="ml-2 font-bold text-indigo-600">
                        {item.valid_to}
                      </span>
                    </span>
                    <span className="flex items-center">
                      <img src={hourglass} className="w-8" />
                      <span className="ml-2 font-bold text-indigo-600">
                        {item.remaining_days}
                      </span>
                      <span className="text-gray-600">&nbsp;Days left</span>
                    </span>
                    <div className="flex items-center justify-evenly">
                      <Link
                        to={'/accounts/' + item.id}
                        className="bg-indigo-500 text-white py-1 px-4 rounded-2xl"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default withAuth(Profile);
