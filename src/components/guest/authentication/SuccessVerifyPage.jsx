// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Assets imports
import { ReactComponent as Check } from 'assets/images/check-circle.svg';

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const SuccessVerify = () => {
  const navigate = useNavigate();
  const toHomePage = () => {navigate('/');}
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xl={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-2'>
                  <Check fill='#82CD47' />
                </Row>
                <Row className='mb-2'>
                  <h4 className='fw-bold text-center'>Xác minh thành công!</h4>
                  <p className='text-secondary mb-0'>
                    Bạn đã xác minh tài khoản thành công!
                  </p>
                  <p className='text-secondary'>
                    Tuy nhiên, để thực hiện các yêu cầu, bạn phải chờ chúng tôi xét duyệt tài khoản trong vòng 1-2 ngày tới.
                  </p>
                </Row>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='fogi' variant='primary' onClick={toHomePage}>
                      Trở về Trang chủ
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessVerify;
