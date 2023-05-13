// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

// Components
import Logo from 'components/common/Logo';
import Modal from 'components/layout/InfoModal'

const Verification = () => {

  const navigate = useNavigate();

  const toHomePage = () => {navigate('/');}
  const toLoginPage = () => {navigate('/login')}
  const resendEmail = () => {navigate('/verifyemail')}
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xl={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Stack className='mb-4' direction='horizontal' gap={4}>
                  <Logo usertype={0} />
                  <Stack direction='vertical'>
                    <h2 className='fw-bold'>
                      Xác minh Tài khoản
                    </h2>
                    <p className='text-secondary mb-0'>
                      Kiểm tra email của bạn để xác minh
                    </p>
                  </Stack>
                </Stack>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='mt-2' variant='outline-secondary' onClick={resendEmail}>
                      Gửi lại mail xác minh
                    </Button>
                    <Button className='fogi mt-2' variant='primary' onClick={toHomePage}>
                      Quay về Trang chủ
                    </Button>
                    <Button className='fogi mt-2' variant='primary' onClick={toLoginPage}>
                      Quay về Trang Đăng nhập
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default Verification;
