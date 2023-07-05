// Essentials
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';

import RequestInfoCard from './components/RequestInfoCard';
import SubCategoryList from './components/subCategory/SubCategoryList';
import VolunteerList from './components/volunteer/VolunteerList';

// Style
import 'assets/css/user/order/Order.css';

const sampleData = [
  {
    id: 0,
    name: 'Thịt heo',
    category_name: 'Đông lạnh',
    count: '100',
    unit: 'kg',
    foodList: []
  },
  {
    id: 1,
    name: 'Bắp cải',
    category_name: 'Rau củ',
    count: '80',
    unit: 'kg',
    foodList: []
  },
  {
    id: 2,
    name: 'Gạo tẻ',
    category_name: 'Gạo',
    count: '25',
    unit: 'kg',
    foodList: []
  },
  {
    id: 3,
    name: 'Hành tím',
    category_name: 'Rau củ',
    count: '50',
    unit: 'kg',
    foodList: []
  }
];

const RequestDetailsPage = ({ request }) => {

  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['subCategory', 'volunteer'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'subCategory':
        return 'Thực phẩm';
      default:
        return 'Tình nguyện viên';
    }
  };
  const styleList = ['success', 'success'];

  // Sub-Category handling
  const [subCategoryList, setSubCategoryList] = useState(sampleData);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(null);

  return (
    <>
      <div className='bg'>
        <div>
          <RequestInfoCard request={request} />
        </div>
        <Row className='my-4'>
          <ChipList
            activeStatusIdx={activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            statusList={statusList}
            getStatusLabel={getStatusLabel}
            styleList={styleList}
          />
        </Row>
        {activeStatusIdx === 0 ?
          <SubCategoryList
            subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
          />
          :
          <VolunteerList
            targetVolunteer={targetVolunteer} setTargetVolunteer={setTargetVolunteer}
          />
        }
      </div>
    </>
  );
};

export default RequestDetailsPage;