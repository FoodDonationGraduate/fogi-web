// Essentials
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';
import ListTitle from 'components/common/ListTitle';
import DashboardTitle from 'components/common/dashboard/DashboardTitle';
import StatsList from 'components/common/dashboard/StatsList';
import Chart from 'components/common/dashboard/Chart';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { retrieveStats, retrieveChart } from 'components/redux/reducer/DashboardReducer';

// Styling
import 'assets/css/common/Dashboard.css';

const DashboardPage = () => {
  const stats = useSelector(state => state.dashboardReducer.stats);
  const chart = useSelector(state => state.dashboardReducer.chart);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['request', 'user'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'request':
        return 'Yêu cầu';
      default:
        return 'Người dùng';
    }
  };
  const styleList = ['success', 'success'];

  // Chip List - Time
  const [activeTimeIdx, setActiveTimeIdx] = useState(0);
  const timeList = ['month', 'day'];
  const getTimeLabel = (time) => {
    switch (time) {
      case 'day':
        return '7 ngày';
      default:
        return '6 tháng';
    }
  };
  const timeStyleList = ['success', 'success'];

  // Chip List - Chart / User type
  const [activeUserIdx, setActiveUserIdx] = useState(0);
  const userList = ['donee', 'donor', 'volunteer'];
  const getUserLabel = (user) => {
    switch (user) {
      case 'donee':
        return 'Người nhận';
      case 'donor':
        return 'Người cho';
      default:
        return 'Tình nguyện viên';
    }
  };
  const userStyleList = ['success', 'success', 'success'];

  // Chip List - Chart / Request type
  const [activeRequestIdx, setActiveRequestIdx] = useState(0);
  const requestList = ['give', 'take'];
  const getRequestLabel = (user) => {
    switch (user) {
      case 'give':
        return 'Cho';
      default:
        return 'Nhận';
    }
  };
  const requestStyleList = ['success', 'success'];
  
  useEffect(() => {
    dispatch(retrieveStats({ stats_type: statusList[activeStatusIdx] }, { userInfo, userToken }, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatusIdx]);
  
  useEffect(() => {
    dispatch(retrieveChart(
    {
      chart_type: statusList[activeStatusIdx],
      user_type: userList[activeUserIdx],
      request_type: requestList[activeRequestIdx],
      time_type: timeList[activeTimeIdx]
    },
    { userInfo, userToken },
    navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatusIdx, activeUserIdx, activeTimeIdx, activeRequestIdx]);

  return (
    <div>
      {/* TỔNG QUAN */}
      <div className='mb-4'>
        <Row className='mt-2'>
          <div className='mb-3'>
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList}
              getStatusLabel={getStatusLabel}
              styleList={styleList}
            />
          </div>
          <ListTitle title={'Tổng quan'} />
        </Row>
        <StatsList stats={stats} />
      </div>
      
      {/* BIỂU ĐỒ */}
      <div>
        <Row>
          <DashboardTitle
            title={'Biểu đồ'}
            activeTimeIdx={activeTimeIdx}
            setActiveTimeIdx={setActiveTimeIdx}
            timeList={timeList}
            getTimeLabel={getTimeLabel}
            timeStyleList={timeStyleList}
          />
            {activeStatusIdx === 0 && (
              <div className='mb-3'>
                <ChipList
                  activeStatusIdx={activeRequestIdx}
                  setActiveStatusIdx={setActiveRequestIdx}
                  statusList={requestList}
                  getStatusLabel={getRequestLabel}
                  styleList={requestStyleList}
                  title={'Loại yêu cầu'}
                />
              </div>
            )}
            {activeStatusIdx === 1 && (
              <div className='mb-3'>
                <ChipList
                  activeStatusIdx={activeUserIdx}
                  setActiveStatusIdx={setActiveUserIdx}
                  statusList={userList}
                  getStatusLabel={getUserLabel}
                  styleList={userStyleList}
                  title={'Loại Người dùng'}
                />
              </div>
            )}
        </Row>
        <Row>
          <Row>
            <div className='chart-container'>
              <div className='d-grid' style={{ height: '320px' }}>
                <Chart chart={chart} />
              </div>
            </div>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;
