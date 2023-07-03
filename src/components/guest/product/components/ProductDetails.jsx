// Essentials
import React, { useState, useRef } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import VolunteerInfo from 'components/common/request/VolunteerInfo';

// Sources
import { FaRegClock } from 'react-icons/fa';
import { MdAllInbox } from 'react-icons/md';

// Utility
import { distanceTime } from 'utils/helpers/Time';
import { getUnit } from 'utils/helpers/Food';

// Components 
import { addNewProduct } from 'components/redux/reducer/CartReducer';
import { handleEmptyToken } from 'components/redux/reducer/AuthenticationReducer';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

const ProductDetails = ({product}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const [count, setCount] = useState(1);
  const increaseCount = () => { setCount(count + 1) };
  const decreaseCount = () => {
    if (count > 1) setCount(count - 1)
  };

  const onSubmit = () => {
    buttonRef.current.disabled = true;
    setTimeout(() => {
      buttonRef.current.disabled = false;
    }, 2000)
    if (handleEmptyToken({userInfo, userToken}, navigate)) {
      if (userInfo.user_type === 'donee') {
        dispatch(addNewProduct({product_id: product.id, quantity: 1}, {userInfo, userToken}, navigate));
      } else {
        dispatch(setModalMessage('Không thể thêm sản phẩm vào giỏ hàng!'))
        dispatch(showModal())
      }
    }
  }

  return (
    <Card className='h-100'>
      <Card.Body>
        <Card.Title>
          <Stack direction='horizontal' gap={3}>
            <h3 className='fw-bold'>{product.name}</h3>
            <span className='product-card-type'>
              {product.category.name}
            </span> 
          </Stack>
        </Card.Title>
        <Stack direction='horizontal' gap={4}>
          <header className='me-4' style={{ color: 'gray' }}>
            <FaRegClock className='me-2 mb-1' />
            {distanceTime(product.expired_time)}
          </header>
          <header style={{ color: 'gray' }}>
            <MdAllInbox className='me-2 mb-1' />
            {product.stock} {getUnit(product.unit)} còn lại
          </header>
        </Stack>
        <p className='mt-2'>
          {product.description}
        </p>

        <VolunteerInfo volunteerInfo={product.volunteer} />
      </Card.Body>

      <Row className='mb-3' style={{ bottom: '0' }}>
        <Stack direction='horizontal'>
          <header className='me-4'>{`Số lượng (${getUnit(product.unit)})`}</header>
          <Button
            className='count-btn-left'
            variant='outline-secondary'
            onClick={decreaseCount}
          >
            -
          </Button>
          <Form.Group style={{ width: '8%' }}>
            <Form.Control
              className='count-input'
              type='number'
              value={count}
              style={{ textAlign: 'center' }}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </Form.Group>
          <Button
            className='count-btn-right'
            variant='outline-secondary'
            onClick={increaseCount}
          >
            +
          </Button>
        </Stack>

        <Row className='mt-3'>
          <Col className='ps-0' xs='auto'>
            <Button ref={buttonRef} className='fogi' variant='primary' onClick={() => onSubmit()}>
              Thêm vào Túi
            </Button>
          </Col>
        </Row>
      </Row>
    </Card>
  );
};

export default ProductDetails;
