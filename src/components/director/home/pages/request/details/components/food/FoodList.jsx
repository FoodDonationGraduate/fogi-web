// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import FoodCard from './FoodCard';

const FoodList = ({
  request
}) => {

  // Pagination handling
  const FOOD_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  // Shown food list
  const [shownFoodList, setShownFoodList] = useState([]);
  useEffect(() => {
    setShownFoodList(request.products.slice(page * FOOD_COUNT, (page + 1) * FOOD_COUNT));
  }, [page, request]);

  return (
    <>
      <Container>
        <ListTitle title={'Danh sách Thực phẩm'} />
        <Row xs={1}>
          {shownFoodList.map((food, idx) => (
            <Col className='mb-3' key={idx}>
              <FoodCard
                food={food}
              />
            </Col>
          ))}
        </Row>
        <div className='d-flex justify-content-center mt-2'>
          <Pagination
            pageCount={Math.ceil(request.products.length / FOOD_COUNT)}
            activeIdx={page}
            onChangePage={onChangePage}
          />
        </div>
      </Container>
    </>
  )
};

export default FoodList;