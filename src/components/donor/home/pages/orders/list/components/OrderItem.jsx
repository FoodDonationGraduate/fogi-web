// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { EqualHeightElement } from 'react-equal-height';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';
import { getStatusByIdx } from 'utils/helpers/Order.jsx';
import { useResizer } from 'utils/helpers/Resizer.jsx';

const OrderItem = ({ order }) => {
  const [status, setStatus] = useState(1);
  const setComplete = () => {
    setStatus(0);
  };
  const setInProgress = () => {
    setStatus(1);
  };
  const setCancel = () => {
    setStatus(2);
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order]);

  // Responsive
  const size = useResizer();

  // Navigation
  const navigate = useNavigate();
  const toOrder = (event) => {
    if (event.target.id && event.target.id == 'order-item-button') {
      return;
    }
    // navigate('/donor/order');
    navigate('/donor/order');
  };

  return (
    <>
      <div className='order-item' id='order-item' onClick={(event) => { toOrder(event); }}>
        <span
          className={`order-item-status order-item-status-${getStatusByIdx(status).css}`}
        >
          {getStatusByIdx(status).label}
        </span>
        <header className='order-item-secondary mt-3 mb-1'>
          {order.id}
        </header>
        <EqualHeightElement name="order-date">
          <h4 className='order-item-date'>
            Ordered on {order.date}
          </h4>
        </EqualHeightElement>
        <EqualHeightElement name="order-total">
          <h5 className='order-item-total'>
            Total cost: {convertNumberToVnd(order.total)}
          </h5>
        </EqualHeightElement>
        <EqualHeightElement name="order-address">
          <header className='order-item-secondary'>
            Ordered at {order.address}
          </header>
        </EqualHeightElement>

        <hr />

        <div>
          <EqualHeightElement name="order-options">
            <Row>
              {status === 1 && (size <= 1 || size === 4) && (
                <>
                  <Col className='ps-0 d-grid' xs={9}>
                    <Button className='fogi' id='order-item-button' variant='primary' onClick={setComplete}>
                      Mark as Complete
                    </Button>
                  </Col>
                  <Col className='pe-0 d-grid' xs={3}>
                    <Button variant='outline-danger' id='order-item-button' onClick={setCancel}>
                      Cancel
                    </Button>
                  </Col>
                </>
              )}
              {status === 1 && (size > 1 && size < 4) && (
                <>
                  <Col className='ps-0 d-grid' xs={6}>
                    <Button className='fogi' id='order-item-button' variant='primary' onClick={setComplete}>
                      Complete
                    </Button>
                  </Col>
                  <Col className='pe-0 d-grid' xs={6}>
                    <Button variant='outline-danger' id='order-item-button' onClick={setCancel}>
                      Cancel
                    </Button>
                  </Col>
                </>
              )}
              {status !== 1 && (
                <>
                  <Col className='px-0 d-grid'>
                    <Button className='fogi' id='order-item-button' variant='outline-secondary' onClick={setInProgress}>
                      Mark as In Progress
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </EqualHeightElement>
        </div>

      </div>
    </>
  );
}

export default OrderItem;
