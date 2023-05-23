// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import CategoryCard from 'components/common/category/CategoryCard';

// Reducer
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const CategoryList = () => {
  const allCategories = useSelector(state => state.categoryReducer.allCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(retrieveAllCategories(navigate));
  }, []);

  return (
    <Container>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4' xs={3} md={4} xl={5}>
            <EqualHeight>
              {Object.keys(allCategories).length !== 0 && allCategories.categories.map((category) => (
                <Col className='mb-4' key={category.id}>
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isDonee={false}
                  />
                </Col>
              ))}
              {/* <div>
                {JSON.stringify(allCategories)}
              </div> */}
            </EqualHeight>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
