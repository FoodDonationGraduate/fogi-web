// Essentials
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

// Assets
import { ReactComponent as NotFound } from 'assets/images/empty.svg';

const CommonNotFoundBody = ({
  title,
  illustrationIdx = 0
}) => {

  return (
    <div className='bg py-4'>
      <Container>
        <Row className='justify-content-center'>
          <NotFound className='w-50' />
          <h4 className='text-center fw-bold'>{title}</h4>
        </Row>
      </Container>
    </div>
  );
};

export default CommonNotFoundBody;
