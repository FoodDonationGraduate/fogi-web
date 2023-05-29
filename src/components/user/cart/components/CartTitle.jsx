// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import RequestInfoCard from './RequestInfoCard';

// Components
import VolunteerInfo from 'components/common/request/VolunteerInfo';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const CartTitle = ({ volunteerInfo }) => {
  let size = useResizer();

  const [isActive, setActive] = React.useState(false);
  
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
                  <Button className='fogi' variant='primary' onClick={() => setActive(true)}>Tạo Yêu cầu</Button>
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
                  <Button className='fogi' variant='primary' onClick={() => setActive(true)}>Tạo Yêu cầu</Button>
                </div>
              </div>
            </>
          }
        </Row>
      </Container>
      <RequestInfoCard 
        isActive={isActive === true}
        setActive={setActive}
      />
    </div>
  );
};

export default CartTitle;
