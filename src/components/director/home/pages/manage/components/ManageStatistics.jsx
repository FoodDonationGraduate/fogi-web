// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import { retrieveCurrentChart, retrieveCurrentStats } from 'components/redux/reducer/DirectorReducer';

// Components
import ChipList from 'components/common/chip/ChipList';
import ListTitle from 'components/common/ListTitle';
import DashboardTitle from 'components/common/dashboard/DashboardTitle';
import StatsList from 'components/common/dashboard/StatsList';
import Chart from 'components/common/dashboard/Chart';

const ManageStatistics = ({ user, userInfo, userToken }) => {
    const stats = useSelector(state => state.directorReducer.currentStats);
    const chart = useSelector(state => state.directorReducer.currentChart);

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

    // Chip List - From
    const [activeFromIdx, setActiveFromIdx] = useState(0);
    const fromList = ['give', 'take'];
    const getFromLabel = (status) => {
        switch (status) {
            case 'give':
                return 'Yêu cầu cho';
            default:
                return 'Yêu cầu nhận';
        }
    };
    const fromStyleList = ['success', 'success'];

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
        dispatch(retrieveCurrentStats(
            { 
                stats_type: user.user_type === 'volunteer' ? fromList[activeFromIdx] : statusList[activeStatusIdx],
                user_email: user.email
            }, 
            { userInfo, userToken },
            navigate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStatusIdx]);

    useEffect(() => {
        dispatch(retrieveCurrentChart(
            {
                chart_type: user.user_type === 'volunteer' ? fromList[activeFromIdx] : statusList[activeStatusIdx],
                unit: unitList[activeUnitIdx],
                time_type: timeList[activeTimeIdx],
                user_email: user.email
            },
            { userInfo, userToken },
            navigate
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStatusIdx, activeUnitIdx, activeTimeIdx]);
    return (
        <div>
        {/* TỔNG QUAN */}
        <div className='mb-4'>
            <Row className='mt-2'>
            <div className='mb-3'>
                {user.user_type === 'volunteer' ?
                    <ChipList
                    activeStatusIdx={activeFromIdx}
                    setActiveStatusIdx={setActiveFromIdx}
                    statusList={fromList}
                    getStatusLabel={getFromLabel}
                    styleList={fromStyleList}
                    /> :
                    <ChipList
                    activeStatusIdx={activeStatusIdx}
                    setActiveStatusIdx={setActiveStatusIdx}
                    statusList={statusList}
                    getStatusLabel={getStatusLabel}
                    styleList={styleList}
                    />
                }
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

export default ManageStatistics;
