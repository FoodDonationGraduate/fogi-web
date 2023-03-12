// Essentials
import * as React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';

// Sources
import { FaRegClock } from 'react-icons/fa';
import { MdAllInbox, MdLinearScale } from 'react-icons/md';

// Styling
import './Card.css';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';

// Helper
import { reduceString } from 'utils/helpers/String';
import { distanceTime } from 'utils/helpers/Time';

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <Card className='product-card h-100'>
      
      <Card.Img className='product-card-img' 
        src={`https://bachkhoi.online/static/product/${product.image_filename}`} 
        alt={product.description}
      />
      <Card.Body className='product-card-body'>
        <EqualHeightElement name="product-name">
          <Card.Title className='product-card-name'>{reduceString(product.name, 20)}</Card.Title>
        </EqualHeightElement>
        <EqualHeightElement name="product-price">
          <Card.Title style={{ color: '#82CD47' }}>
            {convertNumberToVnd(product.price)}
          </Card.Title>
        </EqualHeightElement>
        <EqualHeightElement name="product-expired-date">
          <div>
            <small style={{ color: 'gray' }}>
              <FaRegClock className='me-2 mb-1' />
              {distanceTime(product.expired_time)}
            </small>
          </div>
        </EqualHeightElement>
        <EqualHeightElement name="product-stock">
          <div>
            <small style={{ color: 'gray' }}>
              <MdAllInbox className='me-2 mb-1' />
              {product.stock} {product.unit} còn lại
            </small>
          </div>
        </EqualHeightElement>
        <hr />
        <EqualHeightElement name="product-store">
          <div>
            <Row>
              <Col className='ps-0' md={3} lg={4} xl={3}>
                <img className='donor-logo-s' 
                  src={`https://bachkhoi.online/static/${product.donor.avatar_filename}`}
                  onClick={() => navigate(`/store/${product.id}`)} />
              </Col>
              <Col md={9} lg={8} xl={9}>
                <header style={{ fontWeight: 'bold' }}>
                  {product.donor.name}
                </header>
              </Col>
            </Row>
          </div>
        </EqualHeightElement>
        <div className='d-grid'>
          <Button className='fogi mt-2' variant='primary'>
            Add to Cart
          </Button>
          <Button className='fogi mt-2' variant='outline-secondary' onClick={() => navigate(`/product/${product.id}`)}
>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
