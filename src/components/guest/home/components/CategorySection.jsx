// Essentials
import * as React from 'react';
import { Button, Container, Col, Row, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import CategoryCard from 'components/guest/common/cards/CategoryCard';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

// Styling
import 'assets/css/Fogi.css';
import 'assets/css/guest/home_pape/CategorySection.css'

const CategorySection = () => {
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const splitArray = (array, chunkSize ) => {
    var R = [];
    for (var i = 0; i < array.length; i += chunkSize)
      R.push(array.slice(i, i + chunkSize));
    return R;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(retrieveAllCategories(navigate))
  }, [])

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Categories</h2>
          </Col>
        </Row>
        <Carousel interval={null}>
          {Object.keys(allCategories).length !== 0 && 
            splitArray(allCategories.categories, 6).map((categories, idx) => (
              <Carousel.Item key={idx}>
                <Row className='py-3' xs={2} md={3} lg={6} >
                  {categories.map((category) => (
                    <Col key={category.id}>
                      <CategoryCard category={category}/>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
    </div>
  );
};

export default CategorySection;
