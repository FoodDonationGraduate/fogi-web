// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Components
import UserItem from './UserItem';

// Utility
import { getStatus } from 'utils/helpers/Order.jsx';
import { reduceString } from 'utils/helpers/String';
import { convertToString } from 'utils/helpers/Time';
import { getUnit } from 'utils/helpers/Food';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const RequestCard = ({
  request
}) => {
  const size = useResizer();

  const productListDisplayLength = () => {
    return request.products.length < 4 ? request.products.length : 2;
  };

  return (
    <>
      <span
        className={`order-item-status order-item-status-${getStatus(request).css}`}
      >
        {getStatus(request).label}
      </span>
      <div className='mt-3 mb-1'>
        <h4 className='order-item-date'>
          Yêu cầu {request.id}
        </h4>
      </div>

      <EqualHeightElement name="request-food-list">
        {request.products.slice(0, productListDisplayLength()).map((product, idx) => (
          <header className='order-item-secondary my-1' key={idx}>
            • {product.name} ({product.quantity} {getUnit(product.unit)})
          </header>
        ))}
        {request.products.length >= 4 &&
          <header className='order-item-secondary my-1'>
            và {request.products.length - 2} món khác
          </header>
        }
      </EqualHeightElement>

      <hr className='my-3' />
      
      <EqualHeightElement name='request-volunteer'>
        <Stack
          direction={size > 3 ? 'horizontal' : 'vertical'}
          gap={3}
          className={size > 3 ? 'd-flex justify-content-between' : ''}
        >
          <UserItem user={request.volunteer} />
          {request.user && <UserItem user={request.user} user_type={request.user.user_type} />}
        </Stack>
      </EqualHeightElement>
      <hr className='my-3' />

      <EqualHeightElement name='request-descriptors'>
        <header className='order-item-secondary'>
          <MdOutlineLocationOn /> {reduceString(request.address, 80)}
        </header>
        <header className='order-item-secondary'>
          <MdAccessTime /> {convertToString(request.created_time, 'LocaleDateString')}
        </header>
      </EqualHeightElement>
    </>
  );
}

export default RequestCard;
