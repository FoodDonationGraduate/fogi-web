// Essentials
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import CategoryCard from 'components/common/category/CategoryCard';

const TestPage = () => {

  return (
    <>
      <Container className='mt-4'>
        <Row xs={6}>
          <EqualHeight>
            <Col>
              <CategoryCard
                category={{ name: 'Hạng mục' }}
                user_type={'director'}
              />
            </Col>
          </EqualHeight>
        </Row>
      </Container>
    </>
  );
};

export default TestPage;