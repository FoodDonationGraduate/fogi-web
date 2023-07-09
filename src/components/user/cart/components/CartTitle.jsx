// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import RequestInfoCard from './RequestInfoCard';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

// Styling
import 'assets/css/Fogi.css';
const CartTitle = ({
  isError
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

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4 pb-2'>
          {(allProducts.total_cart_items > 0 && selectedAddress.address !== 'Địa chỉ của bạn') ?
            <>
              <Col className='mb-2' xs={12} lg={7} xl={8}>
                <div className='mb-3'>
                  <h2>Túi nhận Quyên góp</h2>
                </div>
                {!isError ?
                  <Button
                    className='fogi'
                    variant='primary'
                    onClick={() => createRequest()}
                  >
                    Tạo Yêu cầu
                  </Button>
                  :
                  <OverlayTrigger
                    placement={'bottom'}
                    overlay={
                      <Tooltip>
                        Chưa thể tạo Yêu cầu do còn lỗi
                      </Tooltip>
                    }
                  >
                    <span>
                      <Button className='fogi' variant='primary' disabled>
                        Tạo Yêu cầu
                      </Button>
                    </span>
                  </OverlayTrigger>
                }
              </Col>
            </>
            :
            <>
              <div className='mb-2'>
                <div className='mb-4'>
                  <h2 className='mb-3'>Túi nhận Quyên góp</h2>
                  <OverlayTrigger
                    placement={'bottom'}
                    overlay={
                      <Tooltip>
                        {allProducts.total_cart_items === 0 
                        ? 'Chưa có Thực phẩm để tạo Yêu cầu'
                        : 'Vui lòng chọn địa điểm mặc định'}
                      </Tooltip>
                    }
                  >
                    <span>
                      <Button className='fogi' variant='primary' disabled>
                        Tạo Yêu cầu
                      </Button>
                    </span>
                  </OverlayTrigger>
                </div>
              </div>
            </>
          }
        </Row>
      </Container>
      {(!isError && allProducts.total_cart_items > 0) &&
        <RequestInfoCard 
          isActive={isActive === true}
          setActive={setActive}
        />
      }
    </div>
  );
};

export default CartTitle;
