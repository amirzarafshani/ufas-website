import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';

const Activation = (props) => {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [
    resendActivationCodeLoading,
    setResendActivationCodeLoading,
  ] = useState(false);

  useEffect(() => {
    let user = props.user;
    if (user && user.email) {
      let obj = {};
      obj['email'] = user.email;
      obj['activation_code'] = '';
      setData(obj);
    } else {
      history.push('/login');
    }
  }, []);

  const handleSubmit = (values, setSubmitting) => {
    userService
      .activate(values)
      .then((res) => {
        let user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        props.login(user);
        setSubmitting(false);
        if (user.active) {
          history.push('/');
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

  const handleResendActivationCode = (email) => {
    setResendActivationCodeLoading(true);
    let obj = {};
    obj['email'] = email;
    userService
      .resendActivatioCode(obj)
      .then((res) => {
        setResendActivationCodeLoading(false);
      })
      .catch((err) => {
        setResendActivationCodeLoading(false);
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
    activation_code: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
  });
  return (
    <React.Fragment>
      <Helmet>
        <title>Activation</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="flex items-center justify-center mt-12">
        <div className="container max-w-lg px-4 py-8 lg:px-0 lg:py-0">
          <h3 className="text-3xl font-bold text-black text-center">
            Activation
          </h3>

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
            className="bg-red-600 text-white rounded p-4 my-2 hidden"
            role="alert"
          >
            <ul>
              <li>The email field is required.</li>
              <li>The password field is required.</li>
            </ul>
          </div>
          <Formik
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
            enableReinitialize
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
                      disabled
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      htmlFor="activation_code"
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 w-full"
                    >
                      Activation Code
                    </label>
                    <Field
                      name="activation_code"
                      autoComplete="new-password"
                      className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        formik.touched.activation_code &&
                        formik.errors.activation_code
                          ? ' border-red-500'
                          : 'border-gray-200'
                      }`}
                      id="activation_code"
                      placeholder="Activation Code"
                      type="text"
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
                        <span className="px-4">Activate</span>
                      )}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full flex justify-between items-center px-3">
                    <div className="text-gray-40 font-medium lowercase w-full px-0 relative overflow-hidden	h-6 flex items-center justify-center">
                      {resendActivationCodeLoading ? (
                        <div className="dot-pulse"></div>
                      ) : (
                        <a
                          className="text-indigo-600 hover:underline cursor-pointer"
                          onClick={() =>
                            handleResendActivationCode(formik.values.email)
                          }
                        >
                          resend activation code
                        </a>
                      )}
                    </div>
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

export default withAuth(Activation);
