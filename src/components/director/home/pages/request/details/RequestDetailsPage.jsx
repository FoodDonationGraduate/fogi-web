// Essentials
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';

import RequestInfoCard from './components/RequestInfoCard';
import FoodList from './components/food/FoodList';
import SubCategoryList from './components/subCategory/SubCategoryList';
import VolunteerList from './components/volunteer/VolunteerList';

// Style
import 'assets/css/user/order/Order.css';

const sampleSubCategoryList = [
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

const sampleFoodList = [
  {
    id: 0,
    name: 'Thịt heo 502',
    stock: '100',
    unit: 'kg'
  },
  {
    id: 1,
    name: 'Bắp cải 104',
    stock: '80',
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Gạo tẻ 375',
    stock: '25',
    unit: 'kg'
  },
  {
    id: 3,
    name: 'Hành tím 047',
    stock: '50',
    unit: 'kg'
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

  // List handling
  const [subCategoryList, setSubCategoryList] = useState(sampleSubCategoryList);
  const [foodList, setFoodList] = useState(sampleFoodList);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(null);

  return (
    <>
      <div className='bg'>
        <div>
          <RequestInfoCard request={request} />
        </div>
        <Container>
          <Row className='my-4'>
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList}
              getStatusLabel={getStatusLabel}
              styleList={styleList}
            />
          </Row>
        </Container>
        {activeStatusIdx === 0 ?
          <>
            {/* for later: request.donor */}
            {true ?
              <FoodList
                foodList={foodList}
              />
              :
              <SubCategoryList
                subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
              />
            }
          </>
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