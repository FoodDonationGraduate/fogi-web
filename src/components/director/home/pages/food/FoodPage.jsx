// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';
import SubCategoryInfoCard from './components/parentFood/SubCategoryInfoCard';
import FoodCard from './components/food/FoodCard';
import FoodModal from './components/food/FoodModal';
// Reducers
import { retrieveAllParentFood, retrieveAllFood, setCurrentParentFood } from 'components/redux/reducer/DirectorReducer';

const ParentFoodPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { parentFoodId } = useParams();

  // Parent Food
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const currentParentFood = useSelector(state => state.directorReducer.currentParentFood);
  useEffect(() => {
    dispatch(setCurrentParentFood(allParentFood.products.find(p => p.id == parentFoodId)));
  }, []);

  // Food
  const foodList = useSelector(state => state.directorReducer.allFood);
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
    dispatch(retrieveAllFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        parent_id: parentFoodId
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
                <BackButton />
              </div>
              <SubCategoryInfoCard
                subCategory={currentParentFood}
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
  );
};

export default ParentFoodPage;