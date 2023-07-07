// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time';
import { updateProduct, deleteProduct } from 'components/redux/reducer/CartReducer';
import { getUnit } from 'utils/helpers/Food';
import { showQuestionModal, cancelQuestionModal, setModalQuestion } from 'components/redux/reducer/ModalReducer';

const ProductItem = ({
  product,
  overStock,
  setOverStock
}) => {

  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const modalLogic = useSelector(state => state.modalReducer.logic);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let size = useResizer();
  const [count, setCount] = useState(0);
  const [oldCount, setOldCount] = useState(count);
  const [currentProduct, setCurrentProduct] = useState('');

  // Count handling
  const [timer, setTimer] = useState(null);
  const updateCount = (newCount) => { 
    console.log(`update count: ${product.id} | ${newCount} | ${isNaN(newCount)}`);
    dispatch(updateProduct(
      {
        product_id: product.id,
        quantity: Number(newCount),
        setCount,
        oldCount, setOldCount
      },
      { userInfo, userToken },
      navigate
    ));
  };
  const checkOverStock = (newCount) => {
    if (!overStock.includes(product.id)) {
      if (newCount < 1 || newCount > product.stock) {
        setOverStock([...overStock, product.id]);
        return true; // if true, return
      }
      return false;
    }
    if (newCount >= 1 && newCount <= product.stock) {
      setOverStock(overStock.filter(p => p !== product.id));
      return false;
    }
    return true;
  };
  const onUpdateCount = (amount) => {
    setCount(Number(count) + amount);
    window.clearTimeout(timer);

    if (checkOverStock(Number(count) + amount)) return;

    setTimer(window.setTimeout(updateCount, 1000, count + amount));
  };
  const onUpdateInput = (event) => {
    let newCount = Number(event.target.value);
    setCount(newCount);
    window.clearTimeout(timer);

    if (checkOverStock(newCount)) return;

    setTimer(window.setTimeout(updateCount, 1000, newCount));
  };

  const deleteProductModal = (id) => { 
    dispatch(setModalQuestion('Bạn có muốn xóa thực phẩm này không??'));
    dispatch(showQuestionModal());
    setCurrentProduct(id)
  };


  useEffect(() => {
    setCount(product.quantity);
    setOldCount(product.quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (modalLogic) {
      dispatch(cancelQuestionModal());
      if (product.id === currentProduct)
        dispatch(deleteProduct({product_id: currentProduct}, {userInfo, userToken}, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  src={`https://bachkhoi.online/static/${product.image_filename}`} alt='product-img'
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
                  <Stack direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      Còn
                    </header>
                    <h5>{distanceTime(product.expired_time)}</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`} xs={12} md={3}>
                  <Stack direction='vertical' gap={2}>
                    <header className='long-product-label'>{`${product.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(product.unit)})`}</header>
                    <Stack direction='horizontal'>
                      {size > 0 &&
                        <Button
                          className='count-btn-left'
                          variant='outline-secondary'
                          onClick={() => onUpdateCount(-1)}
                          disabled={count <= 1}
                        >
                          -
                        </Button>
                      }
                      <Form.Group>
                        <Form.Control
                          className='count-input'
                          type='number'
                          value={Number(count).toString()}
                          style={{ textAlign: 'center' }}
                          onChange={(e) => onUpdateInput(e) }
                        />
                      </Form.Group>
                      {size > 0 &&
                        <Button
                          className='count-btn-right'
                          variant='outline-secondary'
                          onClick={() => onUpdateCount(1)}
                          disabled={count >= product.stock}
                        >
                          +
                        </Button>
                      }
                    </Stack>
                    {(count < 1 || count > product.stock) ?
                      <small className='error'>
                        <FaExclamationTriangle className='mb-1' />
                        Tồn kho: {product.stock} ({count < 1 && 'Không thể ít hơn 1'}{count > product.stock && 'Không thể vượt quá số lượng tồn kho'})
                      </small>
                      :
                      <small className='small-text'>Tồn kho: {product.stock}</small>
                    }
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`}>
                  <Stack direction='vertical' gap={2}>
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
