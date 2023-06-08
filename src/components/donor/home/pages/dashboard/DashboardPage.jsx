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
  const statusList = ['request', 'food'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'request':
        return 'Yêu cầu';
      default:
        return 'Thực phẩm';
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

  // Chip List - Chart / Unit type
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const unitList = ['item', 'kg'];
  const getUnitLabel = (unit) => {
    switch (unit) {
      case 'item':
        return 'Cái';
      default:
        return 'Kilogram';
    }
  };
  const unitStyleList = ['success', 'success'];
  
  useEffect(() => {
    dispatch(retrieveStats({ stats_type: statusList[activeStatusIdx] }, { userInfo, userToken }, navigate));
  }, [activeStatusIdx]);
  
  useEffect(() => {
    dispatch(retrieveChart(
    {
      chart_type: statusList[activeStatusIdx],
      unit_type: unitList[activeUnitIdx],
      time_type: timeList[activeTimeIdx]
    },
    { userInfo, userToken },
    navigate
    ));
  }, [activeStatusIdx, activeUnitIdx, activeTimeIdx]);

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
            {activeStatusIdx === 1 && (
              <div className='mb-3'>
                <ChipList
                  activeStatusIdx={activeUnitIdx}
                  setActiveStatusIdx={setActiveUnitIdx}
                  statusList={unitList}
                  getStatusLabel={getUnitLabel}
                  styleList={unitStyleList}
                  title={'Đơn vị'}
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
