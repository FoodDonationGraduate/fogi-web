// Essentials
import React from 'react';
import { EqualHeightElement } from 'react-equal-height';

// Utility
import { getStatus } from 'utils/helpers/Order.jsx';

const OrderItem = ({ order }) => {
  const productListDisplayLength = () => {
    return order.products.length < 4 ? order.products.length : 2;
  };

  return (
    <>
      <div className='order-item'>
        <span
          className={`order-item-status order-item-status-${getStatus(order).css}`}
        >
          {getStatus(order).label}
        </span>
        <div className='mt-3 mb-1'>
          <EqualHeightElement name="order-date">
            <h4 className='order-item-date'>
              Tạo ngày {order.date}
            </h4>
          </EqualHeightElement>
        </div>
        <EqualHeightElement name="order-address">
          <header className='order-item-secondary'>
            Tại {order.address}
          </header>
        </EqualHeightElement>

        <hr />

        <h5 className='order-item-product-title'>
          Các món ăn đã đặt
        </h5>
        <EqualHeightElement name="order-list">
          {order.products.slice(0, productListDisplayLength()).map((product) => (
            <header className='order-item-secondary my-1'>
              - {product.name} ({product.count} {product.unit}{product.count > 1 && 's'})
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
