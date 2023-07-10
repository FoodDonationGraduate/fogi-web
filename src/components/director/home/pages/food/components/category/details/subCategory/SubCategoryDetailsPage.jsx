// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

import SubCategoryInfoCard from './SubCategoryInfoCard';
import FoodCard from 'components/director/home/pages/food/components/food/FoodCard';
import FoodModal from 'components/director/home/pages/food/components/food/FoodModal';

// Reducers
import { retrieveFood } from 'components/redux/reducer/DirectorReducer';

const SubCategoryDetailsPage = ({
  subCategory,
  setTargetSubCategory,
  onSubShow
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Food
  const foodList = useSelector(state => state.directorReducer.food);
  const [targetFood, setTargetFood] = useState(null);
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };
  
  const [foodShow, setFoodShow] = useState(false);
  const onFoodShow = () => setFoodShow(true);
  const onFoodClose = () => setFoodShow(false);

  useEffect(() => {
    dispatch(retrieveFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        parent_id: subCategory.id
      },
      { userInfo, userToken },
      navigate
    ))
  }, [page]);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4'>
            <Col>
              <div className='mb-2'>
                <BackButton setTargetList={[{ setTarget: setTargetSubCategory, isReducer: false }]} />
              </div>
              <SubCategoryInfoCard
                subCategory={subCategory}
                setTargetSubCategory={setTargetSubCategory}
                onSubShow={onSubShow}
              />
            </Col>
          </Row>

          <Row>
            <Col className='ps-0'>
              <ListTitle title={'Danh sách Thực phẩm'} />
              <Row className='mb-2' xs={1}>
                <EqualHeight>
                  {Object.keys(foodList).length > 0 && foodList.products.map((food, idx) => (
                    <Col className='mb-3' key={idx}>
                      <FoodCard
                        food={food}
                        onFoodShow={onFoodShow}
                        setTargetFood={setTargetFood}
                        isDisplay={true}
                      />
                    </Col>
                  ))}
                  {(Object.keys(foodList).length === 0 || foodList.total_products === 0) && 
                    <CommonNotFoundBody title='Chưa có thực phẩm nào'/>
                  }
                  <div className='d-flex justify-content-center mt-4'>
                    <Pagination
                      pageCount={Math.ceil(foodList.total_products / FOOD_COUNT)}
                      activeIdx={page}
                      onChangePage={onChangePage}
                    />
                  </div>
                </EqualHeight>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {targetFood &&
        <FoodModal
          food={targetFood}
          foodList={foodList}
          isSorted={true}
          show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
          limit={FOOD_COUNT} offset={page * FOOD_COUNT}
        />
      }
    </>
  )
};

export default SubCategoryDetailsPage;
