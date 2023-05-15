// Essentials
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

// Assets
import { ReactComponent as NotFound } from 'assets/images/404.svg';

const PageNotFoundBody = () => {

  return (
      <div className='bg pb-4'>
        <Container>
          <Row className='justify-content-center'>
            <NotFound className='w-75' />
            <h4 className='text-center fw-bold'>We cannot find the page you are looking for</h4>
          </Row>
        </Container>
      </div>
  );
};

export default PageNotFoundBody;
