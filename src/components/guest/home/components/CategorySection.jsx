// Essentials
import * as React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Components
import CategoryCard from 'components/guest/common/cards/CategoryCard';

// Styling
import 'assets/css/Fogi.css';

// Data
import { CATEGORY_DATA } from 'utils/constants/Category.jsx'

const CategorySection = () => {
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Categories</h2>
          </Col>
        </Row>
        <Row className='py-3' xs={2} md={3} lg={6} >
          {CATEGORY_DATA.map((category) => (
            <Col>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='light'>View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategorySection;
