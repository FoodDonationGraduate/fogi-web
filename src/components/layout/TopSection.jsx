// Essentials
import * as React from 'react';

// Components
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import LocationBar from './LocationBar';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const TopSection = () => {
  const size = useResizer();

  return (
    <>
      <TopBar />
      {size <= 2 &&
        <>
          <SearchBar />
          <hr />
        </>
      }
      <LocationBar />
    </>
  );
};

export default TopSection;
