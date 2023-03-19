// Essentials
import React from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';

// Assets
import DonorLogo from 'assets/images/DonorLogo.jpg'; // temporary
import { MdOutlineLocationOn } from 'react-icons/md';

const OrderInfoCard = () => {

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <h5 className='order-info-id mb-2'>Order ID</h5>
              <h3 className='order-info-total'>Total cost: 25.000 VNĐ</h3>
              <hr />
              <Row>
                <Col className='ps-0'>
                  <Stack direction='horizontal' gap={4}>
                    <img className='order-info-donor-logo' src={DonorLogo} />
                    <Stack className='my-auto' direction='vertical' gap={1}>
                      <h5 className='fw-bold'>Donor name</h5>
                      <Stack direction='horizontal' gap={2}>
                        <MdOutlineLocationOn
                          className='order-info-donor-info order-info-donor-location-icon'
                        />
                        <header className='order-info-donor-info'>
                          227 Nguyen Van Cu, Ward 4, District 5
                        </header>
                      </Stack>
                    </Stack>
                  </Stack>
                </Col>
                <Col className='pe-0' xs={2}>
                  <div className='h-100 d-flex'>
                    <Button className='my-auto me-0 ms-auto' variant='outline-secondary'>
                      View Donor
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderInfoCard;
