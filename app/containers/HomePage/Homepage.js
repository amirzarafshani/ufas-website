import React from 'react';
import { Helmet } from 'react-helmet-async';
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Ufas vpn" />
        </Helmet>
      </React.Fragment>
    );
  }
}
