// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';

// Sources
import { FaRegClock, FaRegHeart } from 'react-icons/fa';
import { MdAllInbox, MdOutlineShare } from 'react-icons/md';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';

const ProductDetails = ({product}) => {
  const [count, setCount] = useState(0);
  const increaseCount = () => { setCount(count + 1) };
  const decreaseCount = () => {
    if (count > 0) setCount(count - 1)
  };

  return (
    <Card className='h-100'>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Title style={{ color: '#82CD47' }}>
          {convertNumberToVnd(product.price)}
        </Card.Title>
        <Stack direction='horizontal' gap={4}>
          <header className='me-4' style={{ color: 'gray' }}>
            <FaRegClock className='me-2 mb-1' />
            2 days left
          </header>
          <header style={{ color: 'gray' }}>
            <MdAllInbox className='me-2 mb-1' />
            63 in store
          </header>
        </Stack>
        <p className='mt-2'>
          This paragraph is used to describe the product.
          The donor can write anything about this product such as ingredients, flavors,...
        </p>
      </Card.Body>
      <Card.Body className='position-absolute w-100' style={{ bottom: '0' }}>
        <Stack direction='horizontal' gap={2}>
          <header className='me-2'>Count</header>
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
          <Col className='ps-0' md='auto' lg='auto'>
            <Button className='fogi' variant='primary'>
              Add to Cart
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
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;
