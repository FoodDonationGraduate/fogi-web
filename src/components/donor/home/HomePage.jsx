// Essentials
import * as React from 'react';
import { useState } from 'react';

// Components
import SideMenu from './components/SideMenu';

// Styles
import './HomePage.css';

const HomePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <div className='bg'>
        <SideMenu
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
        />
      </div>
    </>
  );
};

export default HomePage;