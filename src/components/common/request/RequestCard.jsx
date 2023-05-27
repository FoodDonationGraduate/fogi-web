// Essentials
import React from 'react';
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
      <div className='order-item' onClick={() => navigate(`/donor/request/${order.id}`)}>
        <EqualHeightElement name="request-id">
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

          <hr />

          <header className='order-item-secondary'>
            <MdAccessTime /> {convertToString(order.created_time, 'LocaleDateString')}
          </header>
          <header className='order-item-secondary'>
            <MdOutlineLocationOn /> {reduceString(order.address, 80)}
          </header>
        </EqualHeightElement>

      </div>
    </>
  );
}

export default RequestCard;
