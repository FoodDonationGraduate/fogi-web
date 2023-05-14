// Essentials
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import NotFoundBody from './NotFoundBody'
// Assets
import { ReactComponent as NotFound } from 'assets/images/404.svg';

const NotFoundPage = () => {

  return (
    <>
      <TopSection />
      <NotFoundBody/>
      <Footer />
    </>
  );
};

export default NotFoundPage;
