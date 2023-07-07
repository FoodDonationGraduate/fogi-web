// Essentials
import React from 'react';
import { Accordion, Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Assets
import { FaExclamationTriangle } from "react-icons/fa";
import PlaceHolder from 'assets/images/placeholder.jpg';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const FoodCard = ({
  food
}) => {
  let size = useResizer();

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='long-product-item-static'>
            <Row xs={1} lg={2}>
              <Col className='ps-0' xs={12} md={6}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image' alt='product-img'
                    src={
                      food.image ? `https://bachkhoi.online/static/${food.image}`
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

              <Col md={6}>
                <Row xs={2}>
                  <Col className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={6}>
                    <div>
                      <header className='long-product-label'>Còn</header>
                      <h5 className='mt-2'>2 ngày</h5>
                    </div>
                  </Col>
                  <Col className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={6}>
                    <div>
                      <header className='long-product-label'>Tồn kho</header>
                      <h5 className='mt-2'>{food.quantity} {getUnit(food.unit)}</h5>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default FoodCard;
