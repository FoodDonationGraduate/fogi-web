// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import CategoryCard from 'components/guest/common/cards/CategoryCard';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

// Styling
import 'assets/css/Fogi.css';
import 'assets/css/guest/home_pape/CategorySection.css'

// Utility
import { useResizer } from 'utils/helpers/Resizer';

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
  }, []);

  // Responsive handling
  let size = useResizer();

  const [shownCategories, setShownCategories] = useState([]);

  useEffect(() => {
    let length = 6;
    switch (size) {
      case 0: length = 2; break;
      case 1: length = 3; break;
      case 2: length = 4; break;
      case 3: length = 4; break;
      default: length = 6;
    }
    if (Object.keys(allCategories).length !== 0) {
      setShownCategories(splitArray(allCategories.categories, length));
    }
  }, [size, allCategories]);

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
            shownCategories.map((categories, index) => (
              <Carousel.Item key={index}>
                <Row className='py-3' xs={2} sm={3} md={4} xl={6}>
                  {categories.map((category) => (
                    <Col key={category.id}>
                      <CategoryCard category={category} key={category.id}/>
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
