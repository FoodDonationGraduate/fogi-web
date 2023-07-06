// Essentials
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

// Components
import Pagination from 'components/common/pagination/Pagination';

import FoodCard from './FoodCard';

const FoodListModal = ({
  subCategory,
  foodList, setFoodList,
  subShow, onSubClose
}) => {

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

  // Pagination handling
  const FOOD_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

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
          {sampleList.map((sample, idx) => (
            <div className={idx !== 0 && 'mt-3'} key={idx}>
              <FoodCard
                food={{ content: sample, count: 1 }}
                foodList={foodList} setFoodList={setFoodList}
                isShowStock={true}
              />
            </div>
          ))}
          <div className='d-flex justify-content-center mt-4'>
            <Pagination
              pageCount={Math.ceil(14 / FOOD_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FoodListModal;
