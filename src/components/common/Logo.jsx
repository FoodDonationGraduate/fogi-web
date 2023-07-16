import * as React from 'react';

import { ReactComponent as LogoDonee } from 'assets/images/logo.svg';
import { ReactComponent as LogoDonor } from 'assets/images/logo-donor.svg';
import { ReactComponent as LogoDirector } from 'assets/images/logo-director.svg';
import { ReactComponent as LogoKeeper } from 'assets/images/logo-keeper.svg';

import { useNavigate } from "react-router-dom";

const Logo = ({
  usertype,
  isWhite = false,
  isLarge = false
}) => {

  const navigate = useNavigate(); 
  const toHomePage = () => { navigate('/'); };
  const toDonorHomePage = () => { navigate('/donor/dashboard'); };
  const toDirectorHomePage = () => { navigate('/director/dashboard'); };
  const toKeeperHomePage = () => { navigate('/warehouse_keeper/categories'); };
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
      {usertype === 3 && (
        <LogoKeeper className={className} onClick={toKeeperHomePage} />
      )}
    </>
  );
};

export default Logo;