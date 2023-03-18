import * as React from 'react';

import { ReactComponent as LogoDonee } from 'assets/images/logo.svg';
import { ReactComponent as LogoDonor } from 'assets/images/logo-donor.svg';
import { ReactComponent as LogoVolunteer } from 'assets/images/logo-volunteer.svg';

import { useNavigate } from "react-router-dom";

const Logo = ({
  usertype,
  isWhite = false
}) => {

  const navigate = useNavigate(); 
  const toHomePage = () => { navigate('/') };
  const toDonorHomePage = () => { navigate('/donor/home') };
  const className = 'logo' + (isWhite ? '-alt' : '');

  return (
    <>
      {usertype == 0 && (
        <LogoDonee className={className} onClick={toHomePage} />
      )}
      {usertype == 1 && (
        <LogoDonor className={className} onClick={toDonorHomePage} />
      )}
      {usertype == 2 && (
        <LogoVolunteer className={className} />
      )}
    </>
  );
};

export default Logo;