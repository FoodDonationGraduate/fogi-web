// Essentials
import * as React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

// Sources
import { FaRegClock } from 'react-icons/fa';
import { MdAllInbox, MdLinearScale } from 'react-icons/md';

// Styling
import './Card.css';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';

const ProductCard = ({product}) => {
  return (
    <Card>
      <Card.Img src={product.img} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Title style={{ color: '#82CD47' }}>
          {convertNumberToVnd(product.price)}
        </Card.Title>
        <div>
          <small style={{ color: 'gray' }}>
            <FaRegClock className='me-2 mb-1' />
            2 days left
          </small>
        </div>
        <div>
          <small style={{ color: 'gray' }}>
            <MdAllInbox className='me-2 mb-1' />
            63 in store
          </small>
        </div>
        <hr />
        <div>
          <Row>
            <Col className='ps-0' md={3} lg={3}>
              <img className='donor-logo-s' src={product.donorLogo} />
            </Col>
            <Col>
              <header style={{ fontWeight: 'bold' }}>
                {product.donorName}
              </header>
              <div>
                <small style={{ color: 'gray' }}>
                  <MdLinearScale className='me-2 mb-1' />
                  1.2 km
                </small>
              </div>
            </Col>
          </Row>
        </div>
        <div className='d-grid'>
          <Button className='fogi mt-2' variant='primary'>
            Add to Cart
          </Button>
          <Button className='fogi mt-2' variant='outline-secondary'>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
