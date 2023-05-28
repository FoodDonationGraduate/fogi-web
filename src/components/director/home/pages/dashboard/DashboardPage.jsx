// Essentials
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';
import ListTitle from 'components/common/ListTitle';
import DashboardTitle from 'components/common/dashboard/DashboardTitle';
import StatsList from 'components/common/dashboard/StatsList';
import Chart from 'components/common/dashboard/Chart';

// Styling
import 'assets/css/common/Dashboard.css';

const DashboardPage = () => {
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

  // Chip List - Chart
  const [activeUserIdx, setActiveUserIdx] = useState(0);
  const userList = ['donee', 'donor', 'volunteer'];
  const getUserLabel = (user) => {
    return user[0].toUpperCase() + user.substring(1, user.length);
  };
  const userStyleList = ['success', 'success', 'success'];

  // Sample data
  const data = {
    stats: [
      { label: 'Đã tạo', value: '50' },
      { label: 'Thành công', value: '45' },
      { label: 'Đã hủy', value: '3' }
    ],
    chart: {
      data: [
        { label: 'Tháng 12/2022', value: 23 },
        { label: 'Tháng 1/2023', value: 32 },
        { label: 'Tháng 2', value: 18 },
        { label: 'Tháng 3', value: 56 },
        { label: 'Tháng 4', value: 44 },
        { label: 'Tháng 5', value: 89 }
      ],
      unit: 'cái'
    }
  };

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
        <StatsList stats={data.stats} />
      </div>
      
      {/* BIỂU ĐỒ */}
      <div>
        <Row>
          <DashboardTitle title={'Biểu đồ'} />
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
              <div className='d-flex' style={{ height: '320px' }}>
                <Chart chart={data.chart} />
              </div>
            </div>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;
