import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';
import { FiCheckCircle } from 'react-icons/fi';
import { BiBlock } from 'react-icons/bi';
import AddAccount from './AddAcountModal';

const Profile = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Activation</title>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="border h-40 border-indigo-600 rounded-2xl flex overflow-hidden">
            <div className="bg-indigo-600 text-white w-1/3 flex flex-col items-center justify-center">
              <span className="mb-2">
                <FiCheckCircle className="w-6 h-6" />
              </span>
              <span className="font-bold text-3xl">62</span>
              <span>Days</span>
            </div>
            <div className="flex flex-col items-center justify-evenly text-center w-2/3">
              <span>3 Month</span>
              <span>Samsung Note 5</span>
              <div className="flex items-center justify-evenly">
                <a className="bg-red-500 text-white py-1 px-4 rounded">More</a>
              </div>
            </div>
          </div>
          <div className="border h-40 border-indigo-600 rounded-lg"></div>
          <div className="border h-40 border-indigo-600 rounded-lg"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withAuth(Profile);
