// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

import FoodCard from 'components/director/home/pages/food/components/food/FoodCard';
import FoodModal from 'components/director/home/pages/food/components/food/FoodModal';

// Reducers
import { retrieveAllUnsortedFood } from 'components/redux/reducer/DirectorReducer';

const CategoryDetailsPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Unsorted food
  const allUnsortedFood = useSelector(state => state.directorReducer.allUnsortedFood);
  const [targetFood, setTargetFood] = useState(null);
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  useEffect(() => {
    dispatch(retrieveAllUnsortedFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT
      },
      { userInfo, userToken },
      navigate
    ))
  }, [page]);
  
  const [foodShow, setFoodShow] = useState(false);
  const onFoodShow = () => setFoodShow(true);
  const onFoodClose = () => setFoodShow(false);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <ListTitle title={`Thực phẩm chưa phân loại`} />
          <Row className='mb-2' xs={1}>
            <EqualHeight>
              {Object.keys(allUnsortedFood).length !== 0 && allUnsortedFood.products.map((food, idx) => (
                <Col className='mb-3' key={idx}>
                  <FoodCard
                    food={food}
                    onFoodShow={onFoodShow}
                    setTargetFood={setTargetFood}
                  />
                </Col>
              ))}
              {(Object.keys(allUnsortedFood).length === 0 || allUnsortedFood.total_products === 0) && 
                <CommonNotFoundBody title='Không có Thực phẩm chưa phân loại'/>
              }
              <div className='d-flex justify-content-center mt-4'>
                <Pagination
                  pageCount={Math.ceil(allUnsortedFood.total_products / FOOD_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </div>
            </EqualHeight>
          </Row>
          {targetFood &&
            <FoodModal
              food={targetFood}
              foodList={allUnsortedFood}
              setTargetFood={setTargetFood}
              show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
              limit={FOOD_COUNT} offset={page * FOOD_COUNT}
            />
          }
        </Col>
      </Row>
    </>
  );
};

export default CategoryDetailsPage;