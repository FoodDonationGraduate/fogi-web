// Essentials
import React from 'react';

const TableItemAvatar = ({
  avatar
}) => {

  return (
    <>
      <img
        className='mn-table-item-avatar' 
        src={`https://bachkhoi.online/static/${avatar}`}
      />
    </>
  )
};

export default TableItemAvatar;
