import * as React from 'react';

import { ReactComponent as LogoDonee } from 'assets/images/logo.svg';
import { ReactComponent as LogoDonor } from 'assets/images/logo-donor.svg';
import { ReactComponent as LogoDirector } from 'assets/images/logo-director.svg';

import { useNavigate } from "react-router-dom";

const Logo = ({
  usertype,
  isWhite = false,
  isLarge = false
}) => {

  const navigate = useNavigate(); 
  const toHomePage = () => { navigate('/'); };
  const toDonorHomePage = () => { navigate('/donor/home'); };
  const toDirectorHomePage = () => { navigate('/director/home'); };
  const className = 'logo' + (isWhite ? '-alt' : '') + (isLarge ? ' logo-large' : '');

  return (
    <>
      {usertype === 0 && (
        <LogoDonee className={className} onClick={toHomePage} />
      )}
      {usertype === 1 && (
        <LogoDonor className={className} onClick={toDonorHomePage} />
      )}
      {usertype === 2 && (
        <LogoDirector className={className} onClick={toDirectorHomePage} />
      )}
    </>
  );
};

export default Logo;