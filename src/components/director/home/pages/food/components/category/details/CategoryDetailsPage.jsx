// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import SubCategoryCard from 'components/common/category/SubCategoryCard';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

import CategoryInfoCard from './CategoryInfoCard';
import FoodCard from 'components/director/home/pages/food/components/food/FoodCard';
import FoodModal from 'components/director/home/pages/food/components/food/FoodModal';

// Reducers
import { retrieveAllUnsortedFood, retrieveAllParentFood } from 'components/redux/reducer/DirectorReducer';

const CategoryDetailsPage = ({
  category,
  setTargetCategory,
  setTargetSubCategory,
  onShow,
  onSubShow
}) => {
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

  // Parent Food
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  useEffect(() => {
    if (!category.id) return;
    dispatch(retrieveAllParentFood(
      { category_id: category.id },
      { userInfo, userToken },
      navigate
    ))
  }, [category]);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4'>
            <Col>
              <div className='mb-2'>
                <BackButton setTargetList={[{ setTarget: setTargetCategory, isReducer: false }]} />
              </div>
              {category.image &&
                <CategoryInfoCard
                  category={category}
                  setTargetCategory={setTargetCategory}
                  setTargetSubCategory={setTargetSubCategory}
                  onShow={onShow}
                  onSubShow={onSubShow}
                />
              }
            </Col>
          </Row>

          <Row>
            <Col className='ps-0'>
              <ListTitle title={`Thực phẩm ${category.image ? 'Đại diện' : 'chưa phân loại'}`} />
              {category.id ?
                <>
                  <Row className='mb-2' xs={2} sm={3} md={4}>
                    <EqualHeight>
                      {Object.keys(allParentFood).length !== 0 && allParentFood.products.map((pf, idx) => (
                        <Col className='mb-4' key={idx}>
                          <SubCategoryCard
                            subCategory={pf}
                            setTargetSubCategory={setTargetSubCategory}
                          />
                        </Col>
                      ))}
                    </EqualHeight>
                  </Row>
                  {(Object.keys(allParentFood).length === 0 || allParentFood.total_products === 0) && 
                    <CommonNotFoundBody title='Chưa có Thực phẩm Đại diện nào'/>
                  }
                </>
                :
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
              }
            </Col>
          </Row>
        </Col>
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
    </>
  )
};

export default CategoryDetailsPage;
