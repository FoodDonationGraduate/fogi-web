// Essentials
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';
import ListTitle from 'components/common/ListTitle';
import StatsList from 'components/common/dashboard/StatsList';
import Chart from 'components/common/dashboard/Chart';

// Styling
import 'assets/css/common/Dashboard.css';

const DashboardPage = () => {
  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['food', 'request'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'request':
        return 'Yêu cầu';
      default:
        return 'Thực phẩm';
    }
  };

  // Sample data
  const data = {
    stats: [
      {
        label: 'Đã tạo',
        value: '128 cái'
      },
      {
        label: 'Thành công',
        value: '80 kg'
      },
      {
        label: 'Đã hủy',
        value: '80 kg'
      }
    ],
    chart: {
      data: [
        { date: 'Tháng 12/2022', value: 23 },
        { date: 'Tháng 1/2023', value: 32 },
        { date: 'Tháng 2', value: 18 },
        { date: 'Tháng 3', value: 56 },
        { date: 'Tháng 4', value: 44 },
        { date: 'Tháng 5', value: 89 }
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
            />
          </div>
          <ListTitle title={'Tổng quan'} />
        </Row>
        <StatsList stats={data.stats} />
      </div>
      
      {/* BIỂU ĐỒ */}
      <div>
        <Row>
          <ListTitle title={'Biểu đồ'} />
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
