// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time';
import { updateProduct, deleteProduct } from 'components/redux/reducer/CartReducer';
import { showQuestionModal, cancelQuestionModal, setModalQuestion } from 'components/redux/reducer/ModalReducer';

const ProductItem = ({
  product
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const modalLogic = useSelector(state => state.modalReducer.logic);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let size = useResizer();
  const [count, setCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');

  const increaseCount = (id) => { 
    dispatch(updateProduct({product_id: id, quantity: count + 1}, {userInfo, userToken}, navigate));
  };

  const decreaseCount = (id) => { 
    if (count > 1){
      dispatch(updateProduct({product_id: id, quantity: count - 1}, {userInfo, userToken}, navigate));
    }
  };

  const deleteProductModal = (id) => { 
    dispatch(setModalQuestion('Do you want to delete this product?'));
    dispatch(showQuestionModal());
    setCurrentProduct(id)
  };


  useEffect(() => {
    setCount(product.quantity);
  }, [product]);

  useEffect(() => {
    if (modalLogic) {
      dispatch(cancelQuestionModal());
      if (product.id == currentProduct)
        dispatch(deleteProduct({product_id: currentProduct}, {userInfo, userToken}, navigate));
    }
  }, [modalLogic]);

  return (
    <Row>
      <Col className='px-0'>
        <Card className='long-product-item-static'>
          <Row xs={1} lg={2}>
            <Col className='ps-0' xs={12} lg={4}>
              <Stack direction='horizontal'>
                <img
                  className='long-product-image'
                  src={`https://bachkhoi.online/static/${product.image_filename}`}
                  width='96' height='96'
                />
                <div className='ms-4'>
                  <h5 className='fw-bold'>
                    {product.name}
                  </h5>
                  <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                    {product.category_name}
                  </span>
                </div>
              </Stack>
            </Col>

            <Col lg={8} className={size < 3 && 'ps-0 py-3'}>
              <Row>
                <Col className={`d-flex ${size < 3 && 'ps-0'}`} xs={12} md={3}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      Còn
                    </header>
                    <h5>{distanceTime(product.expired_time)}</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`} xs={12} md={3}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>Số lượng</header>
                    <Stack direction='horizontal'>
                      {size > 0 &&
                        <Button
                          variant='outline-secondary'
                          onClick={() =>decreaseCount(product.id)}
                          disabled={count === 1}
                        >
                          -
                        </Button>
                      }
                      <Form.Group>
                        <Form.Control
                          type='number'
                          value={count}
                          style={{ textAlign: 'center' }}
                          onChange={(e) => setCount(Number(e.target.value))}
                        />
                      </Form.Group>
                      {size > 0 &&
                        <Button
                          variant='outline-secondary'
                          onClick={() => increaseCount(product.id)}
                        >
                          +
                        </Button>
                      }
                    </Stack>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      Tùy chỉnh
                    </header>
                    <Stack direction='horizontal' gap={2}>
                      <Button variant='outline-secondary' onClick={() => navigate(`/product/${product.id}`)}>
                        Xem chi tiết
                      </Button>
                      <Button variant='outline-danger' onClick={() => deleteProductModal(product.id)}>
                        Xóa
                      </Button>
                    </Stack>
                  </Stack>
                </Col>
                
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
