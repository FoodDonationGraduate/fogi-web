// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

// Components
import Logo from 'components/common/Logo';

// Style imports
import '../../../assets/css/Authentication.css';
import '../../../assets/css/Fogi.css';

const AccountType = () => {
 
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <Logo usertype={0} />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Account Type
                    </h2>
                    <p className='text-secondary mb-0'>
                      Select the account type you want to create
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='fogi mt-2' variant='primary'>
                      Donee
                    </Button>
                    <Button className='fogi mt-2' variant='primary'>
                      Doner
                    </Button>
                    <Button className='fogi mt-2' variant='primary'>
                      Volunteer
                    </Button>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-secondary mb-0'>
                    Already have an account?{' '}
                    <a href='/login' className='fogi fw-bold'>
                      Login
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
