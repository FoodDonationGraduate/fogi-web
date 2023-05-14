// Essentials
import * as React from 'react';
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

// Styling
import 'assets/css/Fogi.css';

//Components
import { setTypeOfSort } from 'components/redux/reducer/RequestReducer';

const ListTitle = () => {
  const sort = useSelector(state => state.requestReducer.sort)
  const dispatch = useDispatch();

  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Danh sách Yêu cầu</h2>
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
  );
};

export default ListTitle;
