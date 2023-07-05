// Essentials
import React, { useState } from 'react';

// Components
import RequestInfoCard from './components/RequestInfoCard';
import SubCategoryList from './components/subCategory/SubCategoryList';

// Style
import 'assets/css/user/order/Order.css';

const RequestDetailsPage = ({ request }) => {

  return (
    <>
      <div className='bg'>
        <div>
          <RequestInfoCard request={request} />
        </div>
        <div className='mt-4'>
          <SubCategoryList />
        </div>
      </div>
    </>
  );
};

export default RequestDetailsPage;