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
        </Row>
      </Container>
    </div>
  );
};

export default OrderListTitle;
