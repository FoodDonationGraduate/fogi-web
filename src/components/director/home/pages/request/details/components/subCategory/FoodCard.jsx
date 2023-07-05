// Essentials
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Row, Stack, Form } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const FoodCard = ({
  food
}) => {
  let size = useResizer();

  // Count handling
  const [count, setCount] = useState(1);
  const onUpdateCount = (amount) => {
    let newCount = Number(count) + amount;
    if (newCount < 1 || newCount > food.stock) return;
    setCount(Number(count) + amount);
  };

  const onUpdateInput = (event) => {
    let newCount = Number(event.target.value);
    if (newCount < 1) setCount(1);
    else if (newCount > food.stock) setCount(food.stock);
    else setCount(newCount);
  };

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='p-4'>
            <Row className='d-flex align-items-center' xs={1} md={2}>
              <Col className='ps-0' xs={12} md={9}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${'category_13_image'}`} alt='product-img'
                    width='64' height='64'
                  />
                  <div className='ms-4'>
                    <h5 className='fw-bold'>
                      {food.name}
                    </h5>
                  </div>
                </Stack>
              </Col>

              <Col md={3} className={`${size < 3 && 'ps-0 py-3'}`}>
                <header className='long-product-label'>{`${food.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(food.unit)})`}</header>
                <Stack direction='horizontal'>
                  {size > 0 &&
                    <Button
                      className='count-btn-left'
                      variant='outline-secondary'
                      onClick={() => onUpdateCount(-1)}
                      disabled={count <= 1}
                    >
                      -
                    </Button>
                  }
                  <Form.Group>
                    <Form.Control
                      className='count-input'
                      type='number'
                      value={Number(count).toString()}
                      style={{ textAlign: 'center' }}
                      onChange={(e) => onUpdateInput(e) }
                    />
                  </Form.Group>
                  {size > 0 &&
                    <Button
                      className='count-btn-right'
                      variant='outline-secondary'
                      onClick={() => onUpdateCount(1)}
                      disabled={count >= food.stock}
                    >
                      +
                    </Button>
                  }
                </Stack>
                <small className='small-text'>Tồn kho: {food.stock}</small>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FoodCard;
