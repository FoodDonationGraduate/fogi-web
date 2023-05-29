// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';
import { useNavigate } from 'react-router-dom';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Utility
import { getStatus } from 'utils/helpers/Order.jsx';
import { reduceString } from 'utils/helpers/String';
import { convertToString } from 'utils/helpers/Time';

const RequestCard = ({ order }) => {
  const productListDisplayLength = () => {
    return order.products.length < 4 ? order.products.length : 2;
  };

  const navigate = useNavigate();
  return (
    <>
        <EqualHeightElement name="request-content">
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

          {order.products.slice(0, productListDisplayLength()).map((product) => (
            <header className='order-item-secondary my-1'>
              - {product.name} ({product.quantity} {product.unit})
            </header>
          ))}
          {order.products.length >= 4 &&
            <header className='order-item-secondary my-1'>
              và {order.products.length - 2} món khác
            </header>
          }

          <hr className='my-3' />

          {order.volunteer && 
            <>
              <Stack direction='horizontal' gap={3}>
                <img src={`https://bachkhoi.online/static/${order.volunteer.avatar}`} className='order-item-volunteer-avatar' />
                <Stack direction='vertical' className='justify-content-center'>
                  <small className='order-item-volunteer-label'>Tình nguyện viên</small>
                  <div className='order-item-volunteer-name'>{order.volunteer.name}</div>
                </Stack>
              </Stack>
              <hr className='my-3' />
            </>
          }

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
