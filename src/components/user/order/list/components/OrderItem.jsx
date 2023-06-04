// Essentials
import React from 'react';
import { EqualHeightElement } from 'react-equal-height';
import { useNavigate } from 'react-router-dom';

// Utility
import { getStatus } from 'utils/helpers/Order.jsx';
import { reduceString } from 'utils/helpers/String';
import { convertToString } from 'utils/helpers/Time';
import { getUnit } from 'utils/helpers/Food';

const OrderItem = ({ order }) => {
  const productListDisplayLength = () => {
    return order.products.length < 4 ? order.products.length : 2;
  };
  const navigate = useNavigate();

  return (
    <>
      <div className='order-item' onClick={() => navigate(`/request/${order.id}`)}>
        <span
          className={`order-item-status order-item-status-${getStatus(order).css}`}
        >
          {getStatus(order).label}
        </span>
        <div className='mt-3 mb-1'>
          <EqualHeightElement name="order-date">
            <h4 className='order-item-date'>
              Tạo ngày {convertToString(order.created_time, 'LocaleDateString')}
            </h4>
          </EqualHeightElement>
        </div>
        <EqualHeightElement name="order-address">
          <header className='order-item-secondary'>
            Tại {reduceString(order.address, 80)}
          </header>
        </EqualHeightElement>

        <hr />

        <h5 className='order-item-product-title'>
          Các thực phẩm đã đặt
        </h5>
        <EqualHeightElement name="order-list">
          {order.products.slice(0, productListDisplayLength()).map((product) => (
            <header className='order-item-secondary my-1' key={product.image_filename}>
              - {product.name} ({product.count} {getUnit(product.unit)})
            </header>
          ))}
          {order.products.length >= 4 &&
            <header className='order-item-secondary my-1'>
              và {order.products.length - 2} món khác
            </header>
          }
        </EqualHeightElement>

      </div>
    </>
  );
}

export default OrderItem;
