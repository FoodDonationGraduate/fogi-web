// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import RequestInfoCard from './RequestInfoCard';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

// Styling
import 'assets/css/Fogi.css';
const CartTitle = ({
  isError, overStockPage
}) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.cartReducer.allProducts)
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress)

  const [isActive, setActive] = useState(false);

  const createRequest = () => {
    if ((Object.keys(allProducts).length !== 0 && allProducts.total_cart_items !== 0)) {
      setActive(true);
    } else {
      dispatch(setModalMessage('Bạn cần phải thêm thực phẩm vào túi!'))
      dispatch(showModal())
    }
  }

  const getInvalidPages = () => {
    let str = '';
    for (let i = 0; i < overStockPage.length; i++) {
      str += (overStockPage[i] + 1) + (i === overStockPage.length - 1 ? '' : ', ');
    }
    return str;
  }

  useEffect(() => {
    if (isError) setActive(false);
  }, [isError]);

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4 pb-2'>
          <Col className='mb-2' xs={12} lg={7} xl={8}>
            <div className='mb-3'>
              <h2>Túi nhận Quyên góp</h2>
            </div>
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                (isError || allProducts.total_cart_items == 0 || overStockPage.length > 0) ?
                <Tooltip style={{ position: 'fixed' }}>
                  <div>
                    {
                      (allProducts.total_cart_items > 0 && overStockPage.length > 0)
                      && `Còn thực phẩm quá hạn ở ${overStockPage.length > 1 ? 'các ': ''}trang ${getInvalidPages()}`
                    }
                  </div>
                  <div>
                    {
                      (allProducts.total_cart_items === 0)
                      && 'Chưa có Thực phẩm để tạo Yêu cầu'
                    }
                  </div>
                  <div>
                    {
                      (allProducts.total_cart_items > 0 && selectedAddress.address === 'Địa chỉ của bạn')
                      && 'Vui lòng chọn địa điểm mặc định'
                    }
                  </div>
                </Tooltip>
                : <></>
              }
            >
              <span>
                <Button
                  className='fogi'
                  variant='primary'
                  disabled={isError || allProducts.total_cart_items == 0 || overStockPage.length > 0}
                  onClick={() => createRequest()}
                >
                  Tạo Yêu cầu
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
      {allProducts.total_cart_items > 0 &&
        <RequestInfoCard 
          isActive={isActive}
          setActive={setActive}
        />
      }
    </div>
  );
};

export default CartTitle;
