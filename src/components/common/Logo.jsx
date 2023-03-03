import * as React from 'react';

import { ReactComponent as LogoDonee } from 'assets/images/logo.svg';
import { ReactComponent as LogoDonor } from 'assets/images/logo-donor.svg';
import { ReactComponent as LogoVolunteer } from 'assets/images/logo-volunteer.svg';

import { useNavigate } from "react-router-dom";


const Logo = ({usertype}) => {

  const navigate = useNavigate(); 
  const toHomePage = () => { navigate('/') }

  return (
    <>
      {usertype == 0 && (
        <LogoDonee className='logo' onClick={toHomePage} />
      )}
      {usertype == 1 && (
        <LogoDonor className='logo' />
      )}
      {usertype == 2 && (
        <LogoVolunteer className='logo' />
      )}
    </>
  );
};

export default Logo;