// Essentials
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/guest/common/bars/Footer';
import ListTitle from './components/ListTitle';

// Assets
import { ReactComponent as Empty } from 'assets/images/empty.svg';

// Styling
import 'assets/css/Fogi.css';

const EmptyProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg pb-4'>
        <ListTitle title='<Search result here>'/>
        <Container>
          <Row className='justify-content-center'>
            <Empty className='mb-4' style={{ width: '45%' }} />
            <h4 className='text-center fw-bold'>We cannot find the product you are looking for</h4>
          </Row>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default EmptyProductListPage;
