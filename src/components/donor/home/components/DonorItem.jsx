// Essentials
import * as React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Asset
import DonorLogo from 'assets/images/DonorLogo.jpg'; // temporary

const DonorItem = () => {
  const navigate = useNavigate(); 
  const toProfilePage = () => { navigate('/profile') }
  
  return (
    <>
      {window.innerWidth >= 992 && (
        <div className='side-menu-donor-item' onClick={toProfilePage}>
          <Stack direction='horizontal' gap={4}>
            <img className='donor-logo-sm' src={DonorLogo} />
            <h5 className='fw-bold'>AP Store</h5>
          </Stack>
        </div>
      )}
      {window.innerWidth >= 768 && window.innerWidth < 992 && (
        <Stack className='side-menu-donor-item align-items-center' direction='vertical' onClick={toProfilePage}>
          <img className='donor-logo-sm' src={DonorLogo} />
        </Stack>
      )}
    </>
  );
};

export default DonorItem;
