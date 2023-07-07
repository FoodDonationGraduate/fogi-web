// Essentials
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import FoodCard from './FoodCard';

const FoodList = ({
  foodList
}) => {

  const FOOD_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  return (
    <>
      <Container>
        <ListTitle title={'Danh sách Thực phẩm'} />
        <Row xs={1}>
          {foodList.map((food, idx) => (
            <Col className='mb-3' key={idx}>
              <FoodCard
                food={food}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-2'>
        <Pagination
          pageCount={Math.ceil(foodList.length / FOOD_COUNT)}
          // pageCount={Math.ceil(allRequests.total_requests / REQUEST_COUNT)}
          activeIdx={page}
          onChangePage={onChangePage}
        />
      </div>
    </>
  )
};

export default FoodList;