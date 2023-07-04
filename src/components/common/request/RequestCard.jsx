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

const RequestCard = ({
  order,
  isDirector=false
}) => {
  const productListDisplayLength = () => {
    return order.products.length < 4 ? order.products.length : 2;
  };

  return (
    <>
      <span
        className={`order-item-status order-item-status-${getStatus(order).css}`}
      >
        {getStatus(order).label}
      </span>
      <div className='mt-3 mb-1'>
        <h4 className='order-item-date'>
          Yêu cầu {order.id}
        </h4>
      </div>

      <EqualHeightElement name="request-food-list">
        {order.products.slice(0, productListDisplayLength()).map((product) => (
          <header className='order-item-secondary my-1' key={product.name}>
            • {product.name} ({product.quantity} {getUnit(product.unit)})
          </header>
        ))}
        {order.products.length >= 4 &&
          <header className='order-item-secondary my-1'>
            và {order.products.length - 2} món khác
          </header>
        }
      </EqualHeightElement>

      <hr className='my-3' />
      
      <EqualHeightElement name='request-volunteer'>
        <Stack gap={2}>
          <UserItem user={order.volunteer} />
          {isDirector && <UserItem user={order.user} user_type={order.user.user_type} />}
        </Stack>
      </EqualHeightElement>
      <hr className='my-3' />

      <EqualHeightElement name='request-descriptors'>
        <header className='order-item-secondary'>
          <MdOutlineLocationOn /> {reduceString(order.address, 80)}
        </header>
        <header className='order-item-secondary'>
          <MdAccessTime /> {convertToString(order.created_time, 'LocaleDateString')}
        </header>
      </EqualHeightElement>
    </>
  );
}

export default RequestCard;
