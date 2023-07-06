// Essentials
import React, { useState } from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Components
import FoodModal from './FoodModal';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const FoodCard = ({
  food
}) => {
  let size = useResizer();
  
  // Modal handling
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='long-product-item-static'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
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
              </div>

              <Stack direction='horizontal' gap={4}>
                <div className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`}>
                  <div>
                    <header className='long-product-label'>Còn</header>
                    <h5 className='mt-2'>2 ngày</h5>
                  </div>
                </div>
                <div className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`}>
                  <div>
                    <header className='long-product-label'>Tồn kho</header>
                    <h5 className='mt-2'>{food.stock} {getUnit(food.unit)}</h5>
                  </div>
                </div>
                <div className='ms-4'>
                  <Button variant='outline-secondary' onClick={onShow}>
                    Chỉnh sửa
                  </Button>
                </div>
              </Stack>
            </div>
          </Card>
        </Col>
      </Row>
      <FoodModal
        food={food}
        show={show} onShow={onShow} onClose={onClose}
      />
    </>
  );
};

export default FoodCard;
