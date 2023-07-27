// // Essentials
// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import {  Col, Row } from 'react-bootstrap';
// import { EqualHeight, EqualHeightElement } from 'react-equal-height';

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

// // Components
// import Pagination from 'components/common/pagination/Pagination';
// import RequestCard from 'components/common/request/RequestCard';
// import ChipList from 'components/common/chip/ChipList';

// const ManageStatistics = ({ user }) => {
//     const stats = useSelector(state => state.dashboardReducer.stats);
//     const chart = useSelector(state => state.dashboardReducer.chart);
//     const userInfo = useSelector(state => state.authenticationReducer.user);
//     const userToken = useSelector(state => state.authenticationReducer.token);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Chip List
//     const [activeStatusIdx, setActiveStatusIdx] = useState(0);
//     const statusList = ['request', 'food'];
//     const getStatusLabel = (status) => {
//         switch (status) {
//         case 'request':
//             return 'Yêu cầu';
//         default:
//             return 'Thực phẩm';
//         }
//     };
//     const styleList = ['success', 'success'];

//     // Chip List - Time
//     const [activeTimeIdx, setActiveTimeIdx] = useState(0);
//     const timeList = ['month', 'day'];
//     const getTimeLabel = (time) => {
//         switch (time) {
//         case 'day':
//             return '7 ngày';
//         default:
//             return '6 tháng';
//         }
//     };
//     const timeStyleList = ['success', 'success'];

//     // Chip List - Chart / Unit type
//     const [activeUnitIdx, setActiveUnitIdx] = useState(0);
//     const unitList = ['item', 'kg'];
//     const getUnitLabel = (unit) => {
//         switch (unit) {
//         case 'item':
//             return 'Cái';
//         default:
//             return 'Kilogram';
//         }
//     };
//     const unitStyleList = ['success', 'success'];

//     useEffect(() => {
//         dispatch(retrieveStats({ stats_type: statusList[activeStatusIdx] }, { userInfo, userToken }, navigate));
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [activeStatusIdx]);

//     useEffect(() => {
//         dispatch(retrieveChart(
//         {
//         chart_type: statusList[activeStatusIdx],
//         unit_type: unitList[activeUnitIdx],
//         time_type: timeList[activeTimeIdx]
//         },
//         { userInfo, userToken },
//         navigate
//         ));
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [activeStatusIdx, activeUnitIdx, activeTimeIdx]);

//     return (
//         <div>
//         {/* TỔNG QUAN */}
//         <div className='mb-4'>
//             <Row className='mt-2'>
//             <div className='mb-3'>
//                 <ChipList
//                 activeStatusIdx={activeStatusIdx}
//                 setActiveStatusIdx={setActiveStatusIdx}
//                 statusList={statusList}
//                 getStatusLabel={getStatusLabel}
//                 styleList={styleList}
//                 />
//             </div>
//             <ListTitle title={'Tổng quan'} />
//             </Row>
//             <StatsList stats={stats} />
//         </div>
        
//         {/* BIỂU ĐỒ */}
//         <div>
//             <Row>
//             <DashboardTitle
//                 title={'Biểu đồ'}
//                 activeTimeIdx={activeTimeIdx}
//                 setActiveTimeIdx={setActiveTimeIdx}
//                 timeList={timeList}
//                 getTimeLabel={getTimeLabel}
//                 timeStyleList={timeStyleList}
//             />
//                 {activeStatusIdx === 1 && (
//                 <div className='mb-3'>
//                     <ChipList
//                     activeStatusIdx={activeUnitIdx}
//                     setActiveStatusIdx={setActiveUnitIdx}
//                     statusList={unitList}
//                     getStatusLabel={getUnitLabel}
//                     styleList={unitStyleList}
//                     title={'Đơn vị'}
//                     />
//                 </div>
//                 )}
//             </Row>
//             <Row>
//             <Row>
//                 <div className='chart-container'>
//                 <div className='d-grid' style={{ height: '320px' }}>
//                     <Chart chart={chart} />
//                 </div>
//                 </div>
//             </Row>
//             </Row>
//         </div>
//         </div>
//     );
// };

// export default ManageStatistics;
