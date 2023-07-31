// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { EqualHeightElement } from 'react-equal-height';

// Assets
import { MdOutlineLocationOn, MdAccessTime, MdUpdate } from 'react-icons/md';

// Components
import UserItem from './UserItem';

// Utility
import { getState } from 'utils/helpers/Request.jsx';
import { reduceString } from 'utils/helpers/String';
import { convertToString } from 'utils/helpers/Time';
import { getUnit } from 'utils/helpers/Food';

const RequestCard = ({
  request
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const productListDisplayLength = () => {
    return request.products.length < 4 ? request.products.length : 2;
  };

  const { content, color } = getState({ request });

  return (
    <>
      <span
        className={`order-item-status order-item-status-${color}`}
      >
        {content.chip}
      </span>
        
        <EqualHeightElement name="request-food-name">
          <div className='mt-3 mb-1'>
            <small className='order-item-secondary'>
              Yêu cầu {request.id}
            </small>
            <h5 className='order-item-date'>
              {request.name ? request.name : `Yêu cầu ${request.from === 'donor' ? 'cho' : 'nhận'}`}
            </h5>
          </div>
          
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
        
        <EqualHeightElement name='request-user'>
          <div>
            {(userInfo.user_type === 'director' && request.user) &&
              <>
                <UserItem user={request.user} user_type={request.user.user_type} />
              </>
            }
          </div>
        </EqualHeightElement>
        
        <EqualHeightElement name='request-volunteer'>
          {(userInfo.user_type === 'director') &&
            <hr className='my-3' />
          }
          <div>
            <>
              <UserItem user={request.volunteer} isPickup={request.delivery_type === 'pickup'} />
            </>
          </div>
        </EqualHeightElement>

        <hr className='my-3' />
      
        <EqualHeightElement name='request-descriptors'>
            <header className='order-item-secondary'>
              <MdOutlineLocationOn />{' '}
              {
                request.address.length > 0 ? reduceString(request.address, 80)
                : '2 - 4 Đ. Hồng Hà, Phường 2, Tân Bình, Thành phố Hồ Chí Minh'
              }
            </header>
            <header className='order-item-secondary'>
              <MdAccessTime /> Khởi tạo: {convertToString(request.created_time, 'LocaleDateString')}
            </header>
            <header className='order-item-secondary'>
              <MdUpdate />  Cập nhật: {convertToString(request.last_updated_state_time, 'LocaleDateString')}
            </header>
        </EqualHeightElement>
    </>
  );
}

export default RequestCard;
