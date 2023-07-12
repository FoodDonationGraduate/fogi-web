// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';
import SubCategoryCard from 'components/common/category/SubCategoryCard';

import ListTitle from './components/parentFood/ListTitle';

// Reducers
import { retrieveAllParentFood } from 'components/redux/reducer/DirectorReducer';

const ParentFoodPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { id } = useParams();

  // Parent Food
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const currentCategory = useSelector(state => state.categoryReducer.currentCategory);
  useEffect(() => {
    dispatch(retrieveAllParentFood(
      id ? { category_id: id } : {},
      { userInfo, userToken },
      navigate
    ))
  }, [currentCategory]);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <ListTitle />
          <Row className='mb-2' xs={3} md={4} xl={5}>
            <EqualHeight>
              {Object.keys(allParentFood).length !== 0 && allParentFood.products.map((parentFood, idx) => (
                <Col className='mb-4' key={idx}>
                  <SubCategoryCard
                    subCategory={parentFood}
                  />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          {(Object.keys(allParentFood).length === 0 || allParentFood.total_products === 0) && 
            <CommonNotFoundBody title='Chưa có Thực phẩm Đại diện nào'/>
          }
        </Col>
      </Row>
    </>
  );
};

export default ParentFoodPage;