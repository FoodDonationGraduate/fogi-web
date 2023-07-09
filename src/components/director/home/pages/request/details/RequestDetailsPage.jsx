// Essentials
import React, { useState } from 'react';
import { Button, Col, Container, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components
import BackButton from 'components/common/BackButton';
import CancelModal from 'components/common/request/CancelModal';
import ListTitle from 'components/common/ListTitle';

import RequestInfoCard from './components/RequestInfoCard';
import FoodList from './components/food/FoodList';
import SubCategoryList from './components/subCategory/SubCategoryList';
import VolunteerCard from './components/volunteer/VolunteerCard';
import VolunteerList from './components/volunteer/VolunteerList';

// Reducers
import { setCurrentRequest, updateRequest, updateRequestChild } from 'components/redux/reducer/DirectorReducer';

// Style
import 'assets/css/user/order/Order.css';

const RequestDetailsPage = ({
  request
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // List handling
  const [subCategoryList, setSubCategoryList] = useState(request.products);
  const [childList, setChildList] = useState([]);
  const [foodList, setFoodList] = useState(request.products);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(request.volunteer ? request.volunteer : null);


  // STATUS HANDLING ----------------------------

  const [isError, setIsError] = useState(false);

  const tooltip = (tip) => {
    return (
      <Tooltip style={{ position: 'fixed' }}>{tip}</Tooltip>
    )
  };

  // Update
  const getNextCondition = () => {
    if (request.user.user_type === 'donor') {
      switch (request.status) {
        case 'pending': return {
          condition: targetVolunteer,
          label: 'Duyệt Yêu cầu',
          tip: 'Bạn chưa chọn Tình nguyện viên'
        };
        case 'finding':
          if (request.volunteer) return undefined;
          else return {
            condition: targetVolunteer,
            label: 'Chọn lại Tình nguyện viên',
            tip: 'Bạn chưa chọn Tình nguyện viên'
          }
        case 'shipping': return {
          condition: true,
          label: 'Đã nhận Túi Quyên góp',
          tip: ''
        };
        default: return undefined;
      }
    } else {
      switch (request.status) {
        default: return {
          condition: !isError && childList.length === foodList.length && targetVolunteer,
          label: 'Duyệt Yêu cầu',
          tip: 'Bạn chưa phân phối đủ Thực phẩm hoặc chưa chọn Tình nguyện viên'
        }
      }
    }
  }

  // Cancel
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  // On Update
  const onUpdate = () => {
    const data = request.status === 'pending' ? {
      request_status: 'finding',
      request_id: request.id,
      request_from: request.user.user_type,
      volunteer_email: targetVolunteer.email
    } : {
      request_status: 'success',
      request_id: request.id,
      request_from: request.user.user_type,
    }

    if (request.user.user_type === 'donee' && request.status === 'pending') {

      const childData = {
        request_id: request.id,
        child_products: childList
      };

      dispatch(updateRequestChild(
        {
          request_id: request.id,
          child_products: childList
        },
        { userInfo, userToken },
        navigate
      ));
    }

    dispatch(updateRequest(
      data,
      { userInfo, userToken },
      navigate
    ));
  };

  // --------------------------------------------

  return (
    <>
      <CancelModal
        show={show}
        onClose={onClose}
        volunteerInfo={request.volunteer}
        userInfo={request.user}
        request={request}
      />
      {JSON.stringify(isError)}
      {JSON.stringify(request)}
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
          {request.user.user_type === 'donor' ?
            <FoodList
              foodList={foodList}
            />
            :
            <SubCategoryList
              subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
              childList={childList} setChildList={setChildList}
              isError={isError} setIsError={setIsError}
            />
          }
        </div>
        {JSON.stringify(childList)}
        {!request.volunteer ?
          <>
            {request.status !== 'canceled' &&
              <VolunteerList
                targetVolunteer={targetVolunteer} setTargetVolunteer={setTargetVolunteer}
              />
            }
          </>
          :
          <Container>
            <ListTitle title={'Tình nguyện viên'} />
            <Row>
              <Col>
                <VolunteerCard
                  request={request} volunteer={request.volunteer}
                />
              </Col>
            </Row>
          </Container>
        }
        <Container>
          <Row>
            <div className='d-flex justify-content-end mt-4'>
              <Stack direction='horizontal' gap={2}>
                {['pending', 'finding', 'receiving'].includes(request.status) &&
                  <Button variant='outline-danger' onClick={onShow}>
                  Hủy Yêu cầu
                  </Button>
                }

                {getNextCondition() && (!getNextCondition().condition ?
                  <OverlayTrigger
                    placement={'top'}
                    overlay={tooltip(getNextCondition().tip)}
                  >
                    <span>
                      <Button className='fogi' variant='primary' disabled>
                        {getNextCondition().label}
                      </Button>
                    </span>
                  </OverlayTrigger>
                  :
                  <Button className='fogi' variant='primary' onClick={onUpdate}>
                    {getNextCondition().label}
                  </Button>
                )}

              </Stack>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RequestDetailsPage;