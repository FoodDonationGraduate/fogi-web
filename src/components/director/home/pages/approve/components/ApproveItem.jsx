// Essentials
import React, { useState } from 'react';
import { Button, Row, Col, Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { verifyUser } from 'components/redux/reducer/DirectorReducer.jsx';

// Components
import DocumentModal from './DocumentModal';
import BackgroundModal from './BackgroundModal';
// Style
import 'assets/css/director/HomePage.css';

// Assets
import {
  MdMailOutline,
  MdOutlinePhone,
  MdCalendarToday,
  MdOutlineLocationOn
} from 'react-icons/md';

const ApproveItem = ({
  approve,
  approveCount = 4,
  currentPage,
  user_type,
  userInfo,
  userToken
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Identity Document Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Backgound Document Modal
  const [backgoundShow, setBackgoundShow] = useState(false);
  const handleBackgroundClose = () => setBackgoundShow(false);
  
  // Approval handling
  const handleVerify = (action) => {
    dispatch(verifyUser(
      {
        email: approve.email,
        limit: approveCount,
        offset: currentPage * approveCount,
        user_type,
        action
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };

  return (
    <>
      <DocumentModal user={approve} show={show} handleClose={handleClose} />
      <BackgroundModal user={approve} show={backgoundShow} handleClose={handleBackgroundClose} />
      <div className='manage-card' id='manage-card'>
        <EqualHeightElement name='manage-content'>
          <h4 className='manage-card-name'>
            {approve.name}
          </h4>
      
          <header className='manage-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdMailOutline />
              {approve.email}
            </Stack>
          </header>

          <header className='manage-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdOutlinePhone />
              {approve.phone}
            </Stack>
          </header>
          
          {approve.user_type === 'donee' && (
            <>
              <header className='manage-card-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <MdCalendarToday />
                  {approve.dob}
                </Stack>
              </header>
          
              <header className='manage-card-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <MdOutlineLocationOn />
                  {approve.address}
                </Stack>
              </header>
            </>
          )}
        </EqualHeightElement>
        <div className='manage-card-link' onClick={handleShow}>
          Giấy tờ tùy thân
        </div>
        <div className='manage-card-link' onClick={() => setBackgoundShow(true)}>
          Hoàn cảnh cá nhân
        </div>
        <hr />

        <div>
          <EqualHeightElement name="order-options">
            <Row>
              <Col className='ps-0 d-grid'>
                <Button
                  className='fogi'
                  id='order-item-button'
                  variant='primary'
                  onClick={() => handleVerify('approve')}
                >
                  Xét duyệt
                </Button>
              </Col>
              <Col className='pe-0 d-grid'>
                <Button
                  variant='outline-danger'
                  id='order-item-button'
                  onClick={() => handleVerify('decline')}
                >
                  Từ chối
                </Button>
              </Col>
            </Row>
          </EqualHeightElement>
        </div>
      </div>
    </>
  );
};

export default ApproveItem;
