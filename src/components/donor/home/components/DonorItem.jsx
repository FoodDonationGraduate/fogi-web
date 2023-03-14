// Essentials
import * as React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Asset
import DonorLogo from 'assets/images/DonorLogo.jpg'; // temporary

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const DonorItem = () => {
  const navigate = useNavigate(); 
  const toProfilePage = () => { navigate('/profile') }

  let size = useResizer();
  
  return (
    <>
      {size !== 2 && (
        <div className='side-menu-donor-item' onClick={toProfilePage}>
          <Stack direction='horizontal' gap={4}>
            <img className='donor-logo-sm' src={DonorLogo} />
            <h5 className='fw-bold'>AP Store</h5>
          </Stack>
        </div>
      )}
      {size === 2 && (
        <Stack className='side-menu-donor-item align-items-center' direction='vertical' onClick={toProfilePage}>
          <img className='donor-logo-sm' src={DonorLogo} />
        </Stack>
      )}
    </>
  );
};

export default DonorItem;
