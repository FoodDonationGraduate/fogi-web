// Essentials
import React, { useState } from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Components
import FoodModal from './FoodModal';

// Utility
import { distanceTime } from 'utils/helpers/Time.jsx';
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
      <Card className='long-product-item-static'>
        <Row>
          <Col className='px-0' lg={5} xl={6}>
            <Stack direction='horizontal'>
              <img
                className='long-product-image'
                src={`https://bachkhoi.online/static/${food.image_filename}`} alt='product-img'
                width='64' height='64'
              />
              <div className='ms-4'>
                <h5 className='fw-bold'>
                  {food.name}
                </h5>
              </div>
            </Stack>
          </Col>
          
          <Col className='px-0'>
            <Row className='align-items-center'>
              <Col className={`px-0 ${size < 3 ? 'mt-3' : ''}`} sm={4}>
                <div>
                  <header className='long-product-label'>Còn</header>
                  <h5 className='mt-2'>{distanceTime(food.expired_time)}</h5>
                </div>
              </Col>
              <Col className={`px-0 ${size < 3 ? 'mt-3' : ''}`} sm={4}>
                <div>
                  <header className='long-product-label'>Tồn kho</header>
                  <h5 className='mt-2'>{food.stock} {getUnit(food.unit)}</h5>
                </div>
              </Col>
              <Col className={`d-grid px-0 ${size < 3 ? 'mt-3' : ''}`} sm={4}>
                <Button variant='outline-secondary' onClick={onShow}>
                  {food.subCategory ? 'Chỉnh sửa' : 'Phân loại'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <FoodModal
        food={food}
        show={show} onShow={onShow} onClose={onClose}
      />
    </>
  );
};

export default FoodCard;
