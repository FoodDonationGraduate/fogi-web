// Essentials
import React, { useState } from 'react';
import { Button, Row, Col, Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { verifyUser } from 'components/redux/reducer/DirectorReducer.jsx'

// Components
import DocumentModal from './DocumentModal';

// Style
import 'assets/css/director/HomePage.css';

// Assets
import {
  MdMailOutline, // 0
  MdOutlinePhone, // 1
  MdCalendarToday, // 2
  MdOutlineLocationOn, // 3
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
      <DocumentModal show={show} handleClose={handleClose} />
      <div className='approve-card' id='approve-card'>
        <EqualHeightElement name='approve-content'>
          <h4 className='approve-card-name'>
            {approve.name}
          </h4>
      
          <header className='approve-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdMailOutline />
              {approve.email}
            </Stack>
          </header>

          <header className='approve-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdOutlinePhone />
              {approve.phone}
            </Stack>
          </header>
          
          {approve.user_type === 'donee' && (
            <>
              <header className='approve-card-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <MdCalendarToday />
                  {approve.dob}
                </Stack>
              </header>
          
              <header className='approve-card-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <MdOutlineLocationOn />
                  {approve.address}
                </Stack>
              </header>
            </>
          )}
        </EqualHeightElement>
        <div className='approve-card-link' onClick={handleShow}>
          Giấy tờ tùy thân
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
