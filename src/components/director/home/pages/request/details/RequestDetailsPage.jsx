// Essentials
import React, { useState } from 'react';
import { Button, Container, Row, Stack } from 'react-bootstrap';

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

const RequestDetailsPage = ({ request }) => {

  // List handling
  const [subCategoryList, setSubCategoryList] = useState(sampleSubCategoryList);
  const [foodList, setFoodList] = useState(request.products);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(null);

  return (
    <>
      <div className='bg'>
        <div className='mb-4'>
          <RequestInfoCard request={request} />
        </div>
        <div className='mb-4'>
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
        </div>
        <VolunteerList
          targetVolunteer={targetVolunteer} setTargetVolunteer={setTargetVolunteer}
        />
        <Container>
          <Row>
            <div className='d-flex justify-content-end mt-4'>
              <Stack direction='horizontal' gap={2}>
                <Button variant='outline-danger'>
                  Hủy Yêu cầu
                </Button>
                <Button className='fogi' variant='primary'>
                  Duyệt Yêu cầu
                </Button>
              </Stack>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RequestDetailsPage;