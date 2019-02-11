import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {

  return (
    <Helmet>
      <title>React Starter</title>
      <link rel="icon" href="/src/assets/favicon.ico" />
      <link rel="manifest" href="/src/assets/manifest.json" />
    </Helmet>
  );
};

export default Head;
