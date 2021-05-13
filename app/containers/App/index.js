/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { hot } from 'react-hot-loader/root';
import Layout from 'components/common/Layout/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Register from 'containers/Register/Loadable';
import Activation from 'containers/Activation/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function App() {
  const MainLayout = (props) => {
    return <Layout {...props}>{props.children}</Layout>;
  };
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>

      <MainLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/activation" component={Activation} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </MainLayout>
    </div>
  );
}
export default hot(App);
