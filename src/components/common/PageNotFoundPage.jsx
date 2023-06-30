// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import PageNotFoundBody from './PageNotFoundBody';

const PageNotFoundPage = () => {

  return (
    <>
      <TopSection />
      <PageNotFoundBody/>
      <Footer />
    </>
  );
};

export default PageNotFoundPage;
