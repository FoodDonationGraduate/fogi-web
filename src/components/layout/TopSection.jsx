// Essentials
import * as React from 'react';

// Components
import TopBar from './TopBar';
import LocationBar from './LocationBar';
import SearchBar from './SearchBar';

const TopSection = () => {

  return (
    <>
      <TopBar />
      <SearchBar />
      <hr />
      <LocationBar />
    </>
  );
};

export default TopSection;
