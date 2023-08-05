// Essentials
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

// Assets
import { ReactComponent as Empty } from 'assets/images/empty.svg';

const EmptyProductBody = ({
  text=undefined
}) => {
  return (
        <Container>
          <Row className='justify-content-center'>
            <Empty className='mb-4' style={{ width: '45%' }} />
            <h4 className='text-center fw-bold'>{text ? text :'Không thể tìm được Thực phẩm bạn tìm kiếm'}</h4>
            <div className='mb-4'></div>
          </Row>
        </Container>
  );
};

export default EmptyProductBody;
