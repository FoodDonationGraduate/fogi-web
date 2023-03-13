// Essentials
import * as React from 'react';
import { Button, Container, Col, Row, Carousel } from 'react-bootstrap';

// Components
import CategoryCard from 'components/guest/common/cards/CategoryCard';

// Styling
import 'assets/css/Fogi.css';
import 'assets/css/guest/home_pape/CategorySection.css'
// Data
import { CATEGORY_DATA } from 'utils/constants/Category.jsx'

const CategorySection = () => {
  const splitArray = (array, chunkSize ) => {
    var R = [];
    for (var i = 0; i < array.length; i += chunkSize)
      R.push(array.slice(i, i + chunkSize));
    return R;
  }
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Categories</h2>
          </Col>
        </Row>
        <Carousel interval={null}>
          {splitArray(CATEGORY_DATA, 6).map((categories) => (
            <Carousel.Item>
              <Row className='py-3' xs={2} md={3} lg={6} >
                {categories.map((category) => (
                  <Col>
                    <CategoryCard category={category} key={category.id}/>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default CategorySection;
