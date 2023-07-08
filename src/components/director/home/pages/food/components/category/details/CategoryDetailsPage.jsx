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

import CategoryInfoCard from './CategoryInfoCard';
import FoodCard from 'components/director/home/pages/food/components/food/FoodCard';
import FoodModal from 'components/director/home/pages/food/components/food/FoodModal';

// Reducers
import { retrieveUnsortedFood, retrieveParentFood } from 'components/redux/reducer/DirectorReducer';

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
  const unsortedFood = useSelector(state => state.directorReducer.unsortedFood);
  const [targetFood, setTargetFood] = useState(null);
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  useEffect(() => {
    dispatch(retrieveUnsortedFood(
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
  const parentFood = useSelector(state => state.directorReducer.parentFood);
  useEffect(() => {
    if (!category.id) return;
    dispatch(retrieveParentFood(
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
              <ListTitle title={`Thực phẩm ${category.image ? 'lớn' : 'chưa phân loại'}`} />
              {category.id ?
                <Row className='mb-2' xs={2} sm={3} md={4}>
                  <EqualHeight>
                    {Object.keys(parentFood).length !== 0 && parentFood.products.map((food, idx) => (
                      <Col className='mb-4' key={idx}>
                        <SubCategoryCard
                          subCategory={food}
                          setTargetSubCategory={setTargetSubCategory}
                        />
                      </Col>
                    ))}
                  </EqualHeight>
                </Row>
                :
                <Row className='mb-2' xs={1}>
                  <EqualHeight>
                    {Object.keys(unsortedFood).length !== 0 && unsortedFood.products.map((food, idx) => (
                      <Col className='mb-3' key={idx}>
                        <FoodCard
                          food={food}
                          onFoodShow={onFoodShow}
                          setTargetFood={setTargetFood}
                        />
                      </Col>
                    ))}
                    <div className='d-flex justify-content-center mt-4'>
                      <Pagination
                        pageCount={Math.ceil(unsortedFood.total_products / FOOD_COUNT)}
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
          foodList={unsortedFood}
          setTargetFood={setTargetFood}
          show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
          limit={FOOD_COUNT} offset={page * FOOD_COUNT}
        />
      }
    </>
  )
};

export default CategoryDetailsPage;
