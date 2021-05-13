import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (values, setSubmitting) => {
    userService
      .login(values)
      .then((res) => {
        let user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        props.login(user);
        setSubmitting(false);
        if (user.active) {
          history.push('/');
        } else {
          history.push('/activatuin');
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
    email: Yup.string().required('Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });
  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="flex items-center justify-center mt-12">
        <div className="container max-w-lg px-4 py-8 lg:px-0 lg:py-0">
          <h3 className="text-3xl font-bold text-black text-center">Log In</h3>

          <div className="text-gray-800 text-sm text-center mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign up here
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

          <Formik
            initialValues={{ email: '', password: '' }}
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
                      name="email"
                      autoComplete="new-password"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        formik.touched.email && formik.errors.email
                          ? ' border-red-500'
                          : 'border-gray-200'
                      }`}
                      id="email"
                      placeholder="email"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      htmlFor="password"
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Password
                      {/* <span className="text-gray-40 font-medium lowercase">
                        — need to
                        <a
                          className="text-indigo-600 hover:underline"
                          href="#"
                        >
                          reset your password
                        </a>
                        ?
                      </span> */}
                    </label>
                    <Field
                      name="password"
                      autoComplete="new-password"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        formik.touched.password && formik.errors.password
                          ? ' border-red-500'
                          : 'border-gray-200'
                      }`}
                      id="password"
                      placeholder="password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
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
                        <span className="px-4">Sign In</span>
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

export default withAuth(Login);
