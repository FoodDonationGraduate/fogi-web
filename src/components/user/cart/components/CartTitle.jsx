// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import RequestInfoCard from './RequestInfoCard';
import { useDispatch, useSelector } from 'react-redux';

// Components
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const CartTitle = ({ volunteerInfo }) => {
  let size = useResizer();
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.cartReducer.allProducts)

  const [isActive, setActive] = React.useState(false);

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
                <div>
                  <Button className='fogi' variant='primary' onClick={() => createRequest()}>Tạo Yêu cầu</Button>
                </div>
              </Col>
              <Col>
                <VolunteerInfo isCard={true} volunteerInfo={volunteerInfo} />
              </Col>
            </>
            :
            <>
              <div className='d-flex justify-content-between mb-2'>
                <div className='mb-2'>
                  <h2>Túi nhận Quyên góp</h2>
                </div>
                <div>
                  <Button className='fogi' variant='primary' onClick={() => createRequest()}>Tạo Yêu cầu</Button>
                </div>
              </div>
            </>
          }
        </Row>
      </Container>
      <RequestInfoCard 
        isActive={isActive === true}
        setActive={setActive}
        volunteerInfo={volunteerInfo}
      />
    </div>
  );
};

export default CartTitle;
