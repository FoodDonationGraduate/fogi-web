// Essentials
import React, { useState } from 'react';
import { Button, Container, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components
import BackButton from 'components/common/BackButton';
import RequestInfoCard from './components/RequestInfoCard';
import FoodList from './components/food/FoodList';
import SubCategoryList from './components/subCategory/SubCategoryList';
import VolunteerList from './components/volunteer/VolunteerList';

// Reducers
import { setCurrentRequest, updateRequest } from 'components/redux/reducer/DirectorReducer';

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

const RequestDetailsPage = ({
  request
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // List handling
  const [subCategoryList, setSubCategoryList] = useState(sampleSubCategoryList);
  const [foodList, setFoodList] = useState(request.products);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(request.volunteer ? request.volunteer : null);


  // STATUS HANDLING ----------------------------

  const tooltip = (tip) => {
    return (
      <Tooltip style={{ position: 'fixed' }}>{tip}</Tooltip>
    )
  };

  const getNextCondition = () => {
    switch (request.status) {
      default: return {
        condition: !targetVolunteer,
        tip: 'Bạn chưa chọn Tình nguyện viên'
      };
    }
  }

  const onUpdate = () => {
    const newStatus = 'finding';
    dispatch(updateRequest(
      {
        request_status: newStatus,
        request_id: request.id,
        request_from: request.user.user_type,
        volunteer_email: targetVolunteer.email
      },
      { userInfo, userToken },
      navigate
    ));
  };

  // --------------------------------------------

  return (
    <>
      <div className='bg'>
        <div className='mb-2'>
          <BackButton setTargetList={[
            { setTarget: setCurrentRequest, isReducer: true },
            { setTarget: setTargetVolunteer, isReducer: false }
          ]} />
        </div>
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
                {getNextCondition().condition ?
                  <OverlayTrigger
                    placement={'top'}
                    overlay={tooltip(getNextCondition().tip)}
                  >
                    <span>
                      <Button className='fogi' variant='primary' disabled>
                        Duyệt Yêu cầu
                      </Button>
                    </span>
                  </OverlayTrigger>
                  :
                  <Button className='fogi' variant='primary' onClick={onUpdate}>
                    Duyệt Yêu cầu
                  </Button>
                }
              </Stack>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RequestDetailsPage;