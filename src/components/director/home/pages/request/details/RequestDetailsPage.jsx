// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import BackButton from 'components/common/BackButton';
import CancelModal from 'components/common/request/CancelModal';
import ListTitle from 'components/common/ListTitle';

import RequestInfoCard from './components/RequestInfoCard';
import FoodList from './components/food/FoodList';
import SubCategoryList from './components/subCategory/SubCategoryList';
import SubCategoryDisplayList from './components/subCategory/SubCategoryDisplayList';
import VolunteerCard from './components/volunteer/VolunteerCard';
import VolunteerList from './components/volunteer/VolunteerList';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

// Reducers
import { retrieveCurrentRequest, updateRequest, updateRequestChild, retrieveInitialParentFood } from 'components/redux/reducer/DirectorReducer';

// Style
import 'assets/css/user/order/Order.css';

const RequestDetailsPage = () => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { from, id } = useParams();

  const request = useSelector(state => state.directorReducer.currentRequest);

  // List handling
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [childList, setChildList] = useState({ children: [] });
  const [oldChildList, setOldChildList] = useState({ children: [] });

  const isEnough = () => {
    for (let i = 0; i < request.products.length; i++) {
      const currentChildList = childList.children.filter(c => c.parent_id === request.products[i].id);
      let total = 0;
      for (let j = 0; j < currentChildList.length; j++) {
        total += currentChildList[j].quantity;
      }
      if (total < request.products[i].quantity) return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(retrieveCurrentRequest(
      {
        request_from: from,
        request_id: id
      },
      { userInfo, userToken },
      navigate
    ));
  }, []);

  //
  useEffect(() => {
    if (!request) return;
    const parentFoodList = request.products.map(p => { return { ...p, foodList: [] } });
    setSubCategoryList(parentFoodList);

    if (userInfo.user_type === 'director') {
      dispatch(retrieveInitialParentFood(
        {
          request_id: id,
          setSubCategoryList,
          setChildList,
          setOldChildList
        },
        { userInfo, userToken },
        navigate
      ));
    }
  }, [request]);

  // Volunteer handling
  const [targetVolunteer, setTargetVolunteer] = useState(request ? request.volunteer : null);


  // STATUS HANDLING ----------------------------

  const [isError, setIsError] = useState(false);
  const [isDistributed, setIsDistributed] = useState(false);

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
        case 'shipping': 
          if (userInfo.user_type === 'director') return undefined;
          return {
            condition: true,
            label: 'Đã nhận Túi Quyên góp',
            tip: ''
          };
        default: return undefined;
      }
    } else {
      switch (request.status) {
        case 'pending':
          if (request.delivery === 'delivery') {
            return !isDistributed ? {
              condition: !isError && isEnough(),
              label: 'Xác nhận điều phối',
              tip: 'Bạn chưa phân phối đủ Thực phẩm'
            } : {
              condition: targetVolunteer,
              label: 'Duyệt Yêu cầu',
              tip: 'Bạn chưa chọn Tình nguyện viên'
            }
          } else {
            return {
              condition: !isError && isEnough(),
              label: 'Duyệt Yêu cầu',
              tip: 'Bạn chưa phân phối đủ Thực phẩm'
            }
          }
        case 'finding':
          if (request.volunteer) return undefined;
          else return {
            condition: targetVolunteer,
            label: 'Chọn lại Tình nguyện viên',
            tip: 'Bạn chưa chọn Tình nguyện viên'
          }
        case 'accepted': return {
          condition: true,
          label: 'Chuyển trạng thái',
          tip: ''
        }
        case 'receiving':
        if (request.delivery_type && request.delivery_type === 'pickup') {
          return {
              condition: true,
              label: 'Nhận thành công',
              tip: ''
            }
        } else return undefined;
        default: return undefined;
      }
    }
  }

  // On Update
  const onUpdate = () => {

    if (request.user.user_type === 'donor') {
      // default: donor
      var data = (request.status === 'pending' || (request.status === 'finding' && !request.volunteer)) ? {
        request_status: 'finding',
        request_id: request.id,
        request_from: request.user.user_type,
        volunteer_email: targetVolunteer.email
      } : {
        request_status: 'success',
        request_id: request.id,
        request_from: request.user.user_type,
      }
    }

    // change if is donee
    if (request.user.user_type === 'donee') {
      var newStatus = (request.delivery_type === 'pickup') ? 'accepted' : 'finding';
      switch (request.status) {
        case 'finding': newStatus = !request.volunteer ? 'finding' : 'receiving'; break;
        case 'accepted': newStatus = 'success'; break;
        case 'receiving': newStatus = (request.delivery_type && request.delivery_type === 'pickup') ? 'success' : 'shipping'; break;
        case 'shipping': newStatus = 'success'; break;
      }
      data =
      ((request.status === 'pending' && request.delivery_type !== 'pickup') ||
      (request.status === 'finding' && !request.volunteer))
      ? {
        request_status: newStatus,
        request_id: request.id,
        request_from: request.user.user_type,
        volunteer_email: targetVolunteer.email
      } : {
        request_status: newStatus,
        request_id: request.id,
        request_from: request.user.user_type,
      }
    }

    if (request.user.user_type === 'donee' && request.status === 'pending') {

      dispatch(updateRequest(
        data,
        { userInfo, userToken },
        navigate
      ));

    } else {
      dispatch(updateRequest(
        data,
        { userInfo, userToken },
        navigate
      ));
    }

  };

  const onDistributeChild = () => {
    dispatch(updateRequestChild(
      {
        request_id: request.id,
        child_products: childList.children,
        setIsDistributed,
        request, onUpdate
      },
      { userInfo, userToken },
      navigate
    ));
  };
  
  // Cancel
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  // --------------------------------------------

  return (
    <>
      {(request && Object.keys(request).length !== 0) ?
        <>
          <CancelModal
            show={show}
            onClose={onClose}
            volunteerInfo={request.volunteer}
            userInfo={request.user}
            request={request}
          />
          <div className='bg'>
            <div className='mb-2'>
              <BackButton />
            </div>
            <div className='mb-4'>
              <RequestInfoCard request={request} />
            </div>
            <div className='mb-4'>
              {request.user.user_type === 'donor' ?
                <FoodList
                  foodList={request.products}
                />
                :
                <>
                {request.status === 'pending' ?
                  <>
                    {!isDistributed &&
                      <SubCategoryList
                        subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
                        childList={childList} setChildList={setChildList} oldChildList={oldChildList}
                        isError={isError} setIsError={setIsError}
                      />
                    }
                  </>
                  :
                  <SubCategoryDisplayList
                    subCategoryList={subCategoryList}
                  />
                }
                </>
              }
            </div>
            {!request.volunteer ?
              <>
                {
                ((((request.delivery_type && request.delivery_type !== 'pickup' ) && (['pending', 'finding'].includes(request.status))) && isDistributed)
                || (request.user.user_type === 'donor')) && request.status !== 'canceled' &&
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
                    {['pending', 'accepted', 'finding', 'receiving', 'shipping']
                    .includes(request.status) && userInfo.user_type === 'director' &&
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
                      <Button
                        className='fogi' variant='primary'
                        onClick={
                          (request.delivery_type && request.status === 'pending' && !isDistributed) ?
                          onDistributeChild : onUpdate
                        }
                      >
                        {getNextCondition().label}
                      </Button>
                    )}

                  </Stack>
                </div>
              </Row>
            </Container>
          </div>
        </> :
        <CommonNotFoundBody title='Không tìm thấy yêu cầu này'/>
      }
    </> 
  );
};

export default RequestDetailsPage;