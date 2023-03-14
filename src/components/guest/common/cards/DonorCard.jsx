// Essentials
import * as React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';

// Sources
import { MdOutlineLocationOn, MdLinearScale, MdOutlineAccessTime } from 'react-icons/md';

// Styling
import './Card.css';

const DonorCard = ({donor}) => {
  return (
    <Card>
      <Card.Img src={donor.cover} />
      <Card.Body>
        <Stack direction='horizontal' gap={4}>
          <img className='donor-logo-m' src={donor.logo} />
          <Stack direction='vertical' gap={1}>
            <h4>{donor.name}</h4>
            <Row>
              <Col className='ps-0' xs={2}>
                <MdOutlineLocationOn className='me-2 mb-1' />
              </Col>
              <Col className='ps-0'>
                <small style={{ color: 'gray' }}>
                  227 Nguyen Van Cu, Ward 4, District 5
                </small>
              </Col>
            </Row>
            <Row>
              <Col className='ps-0' xs={2}>
                <MdLinearScale className='me-2 mb-1' />
              </Col>
              <Col className='ps-0'>
                <small style={{ color: 'gray' }}>
                  1.2 km away
                </small>
              </Col>
            </Row>
            <Row>
              <Col className='ps-0' xs={2}>
                <MdOutlineAccessTime className='me-2 mb-1' />
              </Col>
              <Col className='ps-0'>
                <small style={{ color: 'gray' }}>
                  09h00 - 21h00
                </small>
              </Col>
            </Row>
          </Stack>
        </Stack>
        <p className='mt-2 mb-0'>
          This short paragraph is used to describe the donor’s location.
          In particular, what they serve, sell,...
        </p>
      </Card.Body>
    </Card>
  );
};

export default DonorCard;
