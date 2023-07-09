// Essentials
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import Pagination from 'components/common/pagination/Pagination';

import FoodSelectCard from './FoodSelectCard';

// Reducer
import { retrieveFood } from 'components/redux/reducer/DirectorReducer';

const FoodSelectListModal = ({
  subCategory,
  foodList, setFoodList,
  childList, setChildList,
  subShow, onSubClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const retrievedFoodList = useSelector(state => state.directorReducer.food);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination handling
  const FOOD_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  useEffect(() => {
    dispatch(retrieveFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        parent_id: subCategory.id
      },
      { userInfo, userToken },
      navigate
    ));
  }, [page])

  const [sampleList, setSampleList] = useState([{
    id: 1,
    name: 'Thịt heo 502',
    stock: 100,
    unit: 'kg'
  },{
    id: 2,
    name: 'Thịt heo bà Tư',
    stock: 40,
    unit: 'kg'
  },{
    id: 3,
    name: 'Thịt heo con',
    stock: 25,
    unit: 'kg'
  },{
    id: 4,
    name: 'Thịt heo 100',
    stock: 50,
    unit: 'kg'
  }]);

  return (
    <>
      <Modal
        show={subShow}
        onHide={onSubClose}
        backdrop='static'
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{subCategory.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(retrievedFoodList).length !== 0 && retrievedFoodList.products.map((food, idx) => (
            <div className={idx !== 0 ? 'mt-3' : ''} key={idx}>
              <FoodSelectCard
                food={{ content: food, count: 1 }}
                subCategory={subCategory}
                foodList={foodList} setFoodList={setFoodList}
                childList={childList} setChildList={setChildList}
                isShowStock={true}
              />
            </div>
          ))}
          <div className='d-flex justify-content-center mt-4'>
            <Pagination
              pageCount={Math.ceil(retrievedFoodList.total_products / FOOD_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FoodSelectListModal;
