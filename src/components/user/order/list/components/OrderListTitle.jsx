// Essentials
import React from 'react';
import { Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

// Styling
import 'assets/css/Fogi.css';

//Components
import { setTypeOfSort } from 'components/redux/reducer/RequestReducer';

const OrderListTitle = () => {
  const sort = useSelector(state => state.requestReducer.sort)
  const dispatch = useDispatch();
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Yêu cầu của bạn</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <DropdownButton
              variant='outline-secondary'
              title={sort !== '' ? (sort === 'created_time' ? 'Thời gian' : 'Số lượng') : 'Sắp xếp'}
            >
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('created_time'))}>Ngày tạo</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('stock'))}>Số lượng</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort(''))}>Không có</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderListTitle;
