// Essentials
import * as React from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux';

// Sources
import { FaRegClock } from 'react-icons/fa';
import { MdAllInbox } from 'react-icons/md';

// Styling
import 'assets/css/common/Card.css';

// Helper
import { reduceString } from 'utils/helpers/String';
import { distanceTime } from 'utils/helpers/Time';

import { addNewProduct } from 'components/redux/reducer/CartReducer';
import { handleEmptyToken } from 'components/redux/reducer/AuthenticationReducer';

const ProductCard = ({product}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (product_id) => {
    if (handleEmptyToken({userInfo, userToken}, navigate)) {
      dispatch(addNewProduct({product_id: product_id, quantity: 1}, {userInfo, userToken}, navigate));
    }
  }
    
  const date = new Date();

  return (
    <Card className='product-card h-100' > 
      <Card.Img className='product-card-img' 
        src={`https://bachkhoi.online/static/${product.image_filename}`} 
        alt={product.description}
      />
      <Card.Body className='product-card-body'>
        <EqualHeightElement name="product-name">
          <Card.Title className='product-card-name'>{reduceString(product.name, 20)}</Card.Title>
        </EqualHeightElement>
        <EqualHeightElement name="product-descriptors">
          <div className='mb-2'>
            <span className='product-card-type'>
              {product.category_name}
            </span>
          </div>
          <div>
            <small style={{ color: 'gray' }}>
              <FaRegClock className='me-2 mb-1' />
              {distanceTime(product.expired_time)}
            </small>
          </div>
          <div>
            <small style={{ color: 'gray' }}>
              <MdAllInbox className='me-2 mb-1' />
              {product.stock} {product.unit} còn lại
            </small>
          </div>
        </EqualHeightElement>
        
        <hr className='my-2' />

        <Stack direction='horizontal' gap={2}>
          <img
            src={`https://bachkhoi.online/static/${product.volunteer.avatar}?${date.getTime()}`}
            className='rounded-circle' width='32' height='32'
          />
          <Stack direction='vertical'>
            <small style={{ color: 'gray' }}>Tình nguyện viên</small>
            <div>{product.volunteer.name}</div>
          </Stack>
        </Stack>

        <hr className='my-2' />
        
        <div className='d-grid'>
          <Button className='fogi mt-2' variant='primary' onClick={() => onSubmit(product.id)}>
            Thêm vào Túi
          </Button>
          <Button className='fogi mt-2' variant='outline-secondary' onClick={() => navigate(`/product/${product.id}`)}>
            Xem chi tiết
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
