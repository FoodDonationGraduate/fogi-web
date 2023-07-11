// Essentials
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import Pagination from 'components/common/pagination/Pagination';

import FoodSelectCard from './FoodSelectCard';

// Reducer
import { retrieveAllFood } from 'components/redux/reducer/DirectorReducer';

const FoodSelectListModal = ({
  subCategory,
  foodList, setFoodList,
  childList, setChildList,
  modalTrigger, setModalTrigger,
  subShow, onSubClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const retrievedFoodList = useSelector(state => state.directorReducer.allFood);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination handling
  const FOOD_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  useEffect(() => {
    if (!modalTrigger) return;
    dispatch(retrieveAllFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        parent_id: subCategory.id
      },
      { userInfo, userToken },
      navigate
    ));

    setModalTrigger(false);
  }, [modalTrigger, page]);

  return (
    <>
      <Modal
        show={subShow}
        onHide={onSubClose}
        backdrop='static'
        size='xl'
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
