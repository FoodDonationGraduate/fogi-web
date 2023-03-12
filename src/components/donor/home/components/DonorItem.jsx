// Essentials
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Asset
import DonorLogo from 'assets/images/DonorLogo.jpg'; // temporary

const DonorItem = () => {
  const navigate = useNavigate(); 
  const toProfilePage = () => { navigate('/profile') }
  
  return (
    <div className='side-menu-donor-item' onClick={toProfilePage}>
      <Row>
        <Col className='py-2' md={3} lg={3}>
          <img className='donor-logo-sm' src={DonorLogo} />
        </Col>
        <Col className='pt-4'>
          <header className='fw-bold ms-3'>
            AP Store
          </header>
        </Col>
      </Row>
    </div>
  );
};

export default DonorItem;
