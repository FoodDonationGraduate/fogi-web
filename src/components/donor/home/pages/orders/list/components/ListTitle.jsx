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
    </Row>
  );
};

export default ListTitle;
