// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';

// Components
import Logo from 'components/common/Logo';

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const AccountType = () => {
  const navigate = useNavigate()
  const toSignupForUser = () => {navigate('/signup'); }
  const toSignupForDonor = () => {navigate('/donor/signup'); }

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
                      Loại tài khoản
                    </h2>
                    <p className='text-secondary mb-0'>
                      Chọn loại tài khoản bạn muốn tạo
                    </p>
                  </Stack>
                </Stack>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='fogi mt-2' variant='primary' onClick={toSignupForUser}>
                      Donee
                    </Button>
                    <Button className='fogi mt-2' variant='primary' onClick={toSignupForDonor}>
                      Donor
                    </Button>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-secondary mb-0'>
                    Đã có tài khoản?{' '}
                    <a href='/login' className='fogi fw-bold'>
                      Đăng nhập ngay!
                    </a>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountType;
