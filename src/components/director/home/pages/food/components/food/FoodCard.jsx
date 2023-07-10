// Essentials
import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Asset
import PlaceHolder from 'assets/images/placeholder.jpg';

// Utility
import { distanceTime } from 'utils/helpers/Time.jsx';
import { useResizer } from 'utils/helpers/Resizer.jsx';

const FoodCard = ({
  food,
  onFoodShow,
  setTargetFood,
  isDisplay=false
}) => {
  let size = useResizer();

  const onClick = () => {
    setTargetFood(food);
    onFoodShow();
  };

  return (
    <>
      <Card className='long-product-item-static'>
        <Row>
          <Col className='px-0' lg={5} xl={6}>
            <Stack direction='horizontal'>
              <img
                className='long-product-image' alt='product-img'
                src={
                  food.image_filename ? `https://bachkhoi.online/static/${food.image_filename}`
                  : PlaceHolder
                }
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
                {!isDisplay &&
                  <Button variant='outline-secondary' onClick={onClick}>
                    Phân loại
                  </Button>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default FoodCard;
