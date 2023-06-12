// Essentials
import * as React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Assets
import { MdDeleteOutline, MdAccessTime, MdAllInbox } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time.jsx';
import { getUnit } from 'utils/helpers/Food';

//Components
import { showQuestionModal, cancelQuestionModal, setModalQuestion } from 'components/redux/reducer/ModalReducer';
import { deleteProduct } from 'components/redux/reducer/ProductReducer';

const ProductItem = ({
  product
}) => {
  let size = useResizer();
  const [currentProduct, setCurrentProduct] = React.useState('');

  const modalLogic = useSelector(state => state.modalReducer.logic);
  const question = useSelector(state => state.modalReducer.question);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProductById = (id) => {
    dispatch(setModalQuestion('Bạn có muốn xóa sản phẩm này không?'));
    dispatch(showQuestionModal());
    setCurrentProduct(id);
  }

  React.useEffect(() => {
    if (modalLogic && question === 'Bạn có muốn xóa sản phẩm này không?') {
      dispatch(cancelQuestionModal());
      dispatch(deleteProduct({id: currentProduct}, {userInfo, userToken}, navigate));
    }
  }, [modalLogic])

  return (
    <Row>
      <Col className='px-0'>
        <Card className='long-product-item long-product-donor'>
          <Row>
            <Col className='ps-0' xs={12} md={6}>
              <Stack direction='horizontal'>
                <img
                  className='long-product-image'
                  src={`https://bachkhoi.online/static/${product.image_filename}`}
                  width='96' height='96'
                />
                <div className='ms-4'>
                  <h5 className='fw-bold mb-3'>
                    {product.name}
                  </h5>
                  <span className='long-product-type'>
                    {product.category_name}
                  </span>
                </div>
              </Stack>
            </Col>
            
            <Col className={`my-auto ${size <= 1 && 'ps-0 pt-4'}`} xs={12} md={5}>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAllInbox className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Còn</header>
                  )}
                </Col>
                <Col>
                  <h5>{product.stock} {getUnit(product.unit)}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAccessTime className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Thời gian</header>
                  )}
                </Col>
                <Col>
                  <h5>{distanceTime(product.expired_time)}</h5>
                </Col>
              </Row>
            </Col>
      
            <Col className='px-0' md={1} lg={1}>
              <Card className='long-product-tail align-items-center' onClick={() => deleteProductById(product.id)}>
                <div className='long-product-icon-container my-auto'>
                  <MdDeleteOutline className='long-product-icon my-auto' />
                </div>
              </Card>
            </Col>

          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
