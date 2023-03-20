// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Assets
import { MdOutlineLocationOn } from 'react-icons/md';

// Utility
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';
import { getStatus } from 'utils/helpers/Order.jsx';

const OrderItem = ({ order }) => {

  return (
    <>
      <div className='order-item'>
        <span
          className={`order-item-status order-item-status-${getStatus(order).css}`}
        >
          {getStatus(order).label}
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

        <h5 className='order-item-product-title'>
          Product List
        </h5>
        <EqualHeightElement name="order-list">
          {order.products.map((product) => (
            <header className='order-item-secondary my-1'>
              - {product.name} ({product.count} {product.unit}{product.count > 1 && 's'})
            </header>
          ))}
        </EqualHeightElement>

        <hr />

        <EqualHeightElement name="order-store">
          <Stack direction='horizontal' gap={3}>
            <div>
              <img className='order-item-donor-logo' 
                src={order.donor.logo}
              />
            </div>
            <Stack className='my-auto' direction='vertical'>
              <h5 className='order-item-product-title'>
                {order.donor.name}
              </h5>
              <header className='order-item-secondary'>
                <MdOutlineLocationOn className='mb-1 me-2' />
                227 Nguyen Van Cu, Ward 4, District 5
              </header>
            </Stack>
          </Stack>
        </EqualHeightElement>
      </div>
    </>
  );
}

export default OrderItem;
