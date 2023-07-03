// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import RequestInfoCard from './RequestInfoCard';
import { useDispatch, useSelector } from 'react-redux';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

// Components
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

// Styling
import 'assets/css/Fogi.css';
const CartTitle = ({
  volunteerInfo,
  isError
}) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.cartReducer.allProducts)

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
          {volunteerInfo ? 
            <>
              <Col className='mb-2' xs={12} lg={7} xl={8}>
                <div className='mb-2'>
                  <h2>Túi nhận Quyên góp</h2>
                </div>
                <Stack direction='horizontal' gap={4}>
                  <Button
                    className='fogi'
                    variant='primary'
                    onClick={() => createRequest()}
                    disabled={isError}
                  >
                    Tạo Yêu cầu
                  </Button>
                  {isError &&
                    <div className='error'>
                      <FaExclamationTriangle className='mb-1' /> {' '}
                      Không thể tạo Yêu cầu
                    </div>
                  }
                </Stack>
              </Col>
              <Col>
                <VolunteerInfo isCard={true} volunteerInfo={volunteerInfo} />
              </Col>
            </>
            :
            <>
              <div className='mb-2'>
                <div className='mb-4'>
                  <h2>Túi nhận Quyên góp</h2>
                </div>
              </div>
            </>
          }
        </Row>
      </Container>
      {isError &&
        <RequestInfoCard 
          isActive={isActive === true}
          setActive={setActive}
          volunteerInfo={volunteerInfo}
        />
      }
    </div>
  );
};

export default CartTitle;
