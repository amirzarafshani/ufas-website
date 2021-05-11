import React from 'react';
import { Helmet } from 'react-helmet-async';
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className="container mx-auto">
          <h1 className="bg-red-500 mx-auto text-white text-center p-4 m-4 shadow-lg rounded-full">
            Home Page
          </h1>
        </div>
      </article>
    );
  }
}
