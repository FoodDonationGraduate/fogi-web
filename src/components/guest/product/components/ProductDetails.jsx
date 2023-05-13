// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';

// Sources
import { FaRegClock, FaRegHeart } from 'react-icons/fa';
import { MdAllInbox, MdOutlineShare } from 'react-icons/md';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';
import { distanceTime } from 'utils/helpers/Time';

const ProductDetails = ({product}) => {
  const [count, setCount] = useState(0);
  const increaseCount = () => { setCount(count + 1) };
  const decreaseCount = () => {
    if (count > 0) setCount(count - 1)
  };

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
            {product.stock} {product.unit} còn lại
          </header>
        </Stack>
        <p className='mt-2'>
          {product.description}
        </p>
      </Card.Body>

      <Row className='mb-3' style={{ bottom: '0' }}>
        <Stack direction='horizontal' gap={2}>
          <header className='me-2'>{`Số lượng (${product.unit})`}</header>
          <Button
            variant='outline-secondary'
            onClick={decreaseCount}
          >
            -
          </Button>
          <Form.Group style={{ width: '8%' }}>
            <Form.Control
              type='number'
              value={count}
              style={{ textAlign: 'center' }}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </Form.Group>
          <Button
            variant='outline-secondary'
            onClick={increaseCount}
          >
            +
          </Button>
        </Stack>

        <Row className='mt-3'>
          <Col className='ps-0' xs='auto'>
            <Button className='fogi' variant='primary'>
              Thêm vào Giỏ
            </Button>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Stack direction='horizontal' gap={4}>
              <h5>
                <FaRegHeart className='mb-1 me-2' />
                10
              </h5>
              <h5>
                <MdOutlineShare className='mb-1 me-2' />
                5
              </h5>
            </Stack>
          </Col>
        </Row>
      </Row>
    </Card>
  );
};

export default ProductDetails;
