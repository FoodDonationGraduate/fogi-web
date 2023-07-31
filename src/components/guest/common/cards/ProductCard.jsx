// Essentials
import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux';

// Sources
import { MdAllInbox } from 'react-icons/md';

// Styling
import 'assets/css/common/Card.css';

// Helper
import { reduceString } from 'utils/helpers/String';
import { getUnit } from 'utils/helpers/Food';

// Components
import { addNewProduct } from 'components/redux/reducer/CartReducer';
import { handleEmptyToken } from 'components/redux/reducer/AuthenticationReducer';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

const ProductCard = ({product}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = React.useRef(null);
  // const date = new Date();
  // const [data, setData] = React.useState({})

  const onSubmit = (event) => {
    let clone = Object.assign({}, buttonRef)
    clone.current.disabled = true;
    setTimeout(() => {
      clone.current.disabled = false;
    }, 2000)
    if (handleEmptyToken({userInfo, userToken}, navigate)) {
      if (userInfo.user_type === 'donee') {
        // if (product.volunteer.email === volunteerInfo.email) {
          dispatch(addNewProduct({product_id: product.id, quantity: 1}, {userInfo, userToken}, navigate));
        // } else {
        //   dispatch(setModalQuestion("Bạn có muốn tạo túi nhận mới?"))
        //   dispatch(showQuestionModal())
        //   setData({product_id: product.id, quantity: 1})
        // }
      } else {
        dispatch(setModalMessage('Không thể thêm thực phẩm vào giỏ hàng!'))
        dispatch(showModal())
      }
    }
    event.stopPropagation();
  }

  // React.useEffect(() => {
  //   if (modalLogic) {
  //       dispatch(cancelQuestionModal())
  //       dispatch(addNewProduct(data, {userInfo, userToken}, navigate))
  //   }
  // })

  return (
    <Card className='product-card h-100' onClick={() => navigate(`/product/${product.id}`)}> 
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
          {/* <div>
            <small style={{ color: 'gray' }}>
              <FaRegClock className='me-2 mb-1' />
              {distanceTime(product.expired_time)}
            </small>
          </div> */}
          <div>
            <small style={{ color: 'gray' }}>
              <MdAllInbox className='me-2 mb-1' />
              {product.stock} {getUnit(product.unit)} còn lại
            </small>
          </div>
        </EqualHeightElement>
        
        <hr className='my-2' />

        {/* <EqualHeightElement name="product-volunteer">
          <Stack direction='horizontal' gap={2}>
            <img
              src={`https://bachkhoi.online/static/${product.volunteer.avatar}?${date.getTime()}`} alt='volunteer-avatar'
              className='rounded-circle' width='32' height='32'
            />
            <Stack direction='vertical'>
              <small style={{ color: 'gray' }}>Tình nguyện viên</small>
              <div>{product.volunteer.name}</div>
            </Stack>
          </Stack>
        </EqualHeightElement> */}
        
        <div className='d-grid'>
          <Button ref={buttonRef} className='fogi mt-2' variant='primary' onClick={(event) => onSubmit(event)}>
            Thêm vào Túi
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
