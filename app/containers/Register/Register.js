import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { GoCheck } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import CircleLoading from '../../components/common/base/CircleLoading';

const Register = (props) => {
  const initialData = {
    email: '',
    password: '',
  };
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [referrerCodeErrorMessage, setReferrerCodeErrorMessage] = useState(
    undefined,
  );
  const [checkReferrerCodeLoading, setCheckReferrerCodeLoading] = useState(
    false,
  );
  const [referrerCode, setReferrerCode] = useState('');
  const [referrerCodeIsValid, setReferrerCodeIsValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/register') {
      if (location.pathname) {
        const qr = queryString.parse(location.search);
        if (qr.referrerCode) {
          chechReferrerCode(qr.referrerCode);
        }
      }
    }
  }, []);

  const chechReferrerCode = (code) => {
    setCheckReferrerCodeLoading(true);
    userService
      .validateReferralCode(code)
      .then((res) => {
        setReferrerCode(code);
        setReferrerCodeErrorMessage(res.data.message);
        if (res.data.result) {
          setReferrerCodeIsValid(true);
        } else {
          setReferrerCodeIsValid(false);
        }
        setCheckReferrerCodeLoading(false);
      })
      .catch((err) => {
        setCheckReferrerCodeLoading(false);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setErrorMessage(err.response.data.error);
        }
      });
  };

  const handleSubmit = (values, setSubmitting) => {
    userService
      .register(values)
      .then((res) => {
        let user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        props.login(user);
        setSubmitting(false);
        if (user.active) {
          history.push('/');
        } else {
          history.push('/activation');
        }
      })
      .catch((err) => {
        setSubmitting(false);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          setErrorMessage(err.response.data.error);
        }
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });

  const handleCheckReferrerCode = (code) => {
    setReferrerCode(code);
    chechReferrerCode(code);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="flex items-center justify-center mt-12">
        <div className="container max-w-lg px-4 py-8 lg:px-0 lg:py-0">
          <h3 className="text-3xl font-bold text-black text-center">
            Create Your Account
          </h3>
          <div className="text-gray-800 text-sm text-center mb-8">
            Have an account?{' '}
            <Link to="login" className="text-indigo-600 hover:underline">
              Log in here
            </Link>
          </div>

          <div
            className={`bg-red-600 text-white rounded p-4 mt-2 mb-4 ${
              errorMessage ? '' : 'hidden'
            }`}
            role="alert"
          >
            <ul>
              <li>{errorMessage}</li>
            </ul>
          </div>

          <div
            className={`bg-yellow-500 text-white rounded p-4 mt-2 mb-4 ${
              referrerCode && referrerCodeErrorMessage ? '' : 'hidden'
            }`}
            role="alert"
          >
            <ul>
              <li>{referrerCodeErrorMessage}</li>
            </ul>
          </div>

          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {(formik) => (
              <Form autoComplete="off">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      autoComplete="new-password"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        formik.touched.email && formik.errors.email
                          ? ' border-red-500'
                          : 'border-gray-200'
                      }`}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@domain"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Must be a valid email. We promise no marketing or email
                      lists.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      autoComplete="new-password"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        formik.touched.password && formik.errors.password
                          ? ' border-red-500'
                          : 'border-gray-200'
                      }`}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="******************"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Make it at least 8 characters and as crazy as you'd like
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="referrer_code"
                    >
                      Referral Code
                    </label>
                    <div className="flex items-center w-full mb-3">
                      <input
                        autoComplete="new-password"
                        className={`-mr-10 pr-3 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                          formik.touched.referrer_code &&
                          formik.errors.referrer_code
                            ? ' border-red-500'
                            : 'border-gray-200'
                        }`}
                        type="text"
                        name="referrer_code"
                        id="referrer_code"
                        placeholder="Referral Code"
                        onChange={(e) =>
                          handleCheckReferrerCode(e.target.value)
                        }
                        value={referrerCode}
                      />
                      <div className="w-10 z-10 pr-1 text-center pointer-events-none  flex items-center justify-center">
                        {checkReferrerCodeLoading ? (
                          <CircleLoading />
                        ) : referrerCode ? (
                          referrerCodeIsValid ? (
                            <GoCheck className="text-2xl fill-current	text-green-600" />
                          ) : (
                            <MdClose className="text-2xl fill-current	text-red-600" />
                          )
                        ) : null}
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs italic">
                      Must be a valid email. We promise no marketing or email
                      lists.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div>
                    By signing up you agree to the{' '}
                    <a
                      className="text-indigo-600 font-semibold hover:underline"
                      href="#"
                    >
                      terms
                    </a>{' '}
                    and our simple{' '}
                    <a
                      className="text-indigo-600 font-semibold hover:underline"
                      href="#"
                    >
                      rules
                    </a>
                    .
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                  <div className="w-full flex justify-between items-center px-3">
                    <a
                      className="w-full py-2 border border-transparent shadow-sm text-sm font-medium rounded-md 
                      text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-indigo-500 overflow-hidden h-12 flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        !formik.isSubmitting && formik.submitForm()
                      }
                    >
                      {formik.isSubmitting ? (
                        <div className="dot-pulse"></div>
                      ) : (
                        <span className="px-4">Sign Up</span>
                      )}
                    </a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withAuth(Register);
