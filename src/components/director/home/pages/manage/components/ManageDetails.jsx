// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { retrieveReports } from 'components/redux/reducer/DirectorReducer';

// Components
import ManageInfoCard from './ManageInfoCard';
import ReportItem from './ReportItem';
import Pagination from 'components/common/pagination/Pagination';
import ListTitle from 'components/common/ListTitle';
import BackButton from 'components/common/BackButton';

const ManageDetails = ({ user, setTargetUser }) => {
  const reports = useSelector(state => state.directorReducer.reports);
  const directorInfo = useSelector(state => state.authenticationReducer.user);
  const directorToken = useSelector(state => state.authenticationReducer.token);

  const REPORT_COUNT = 4; // per page
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveReports(
      {
        limit: REPORT_COUNT,
        offset: idx * REPORT_COUNT,
        reportee_email: user.email
      }, {
        userInfo: directorInfo,
        userToken: directorToken
      },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  
  useEffect(() => {
    setPage(0);
    dispatch(retrieveReports(
      {
        limit: REPORT_COUNT,
        offset: 0,
        reportee_email: user.email
      }, {
        userInfo: directorInfo,
        userToken: directorToken
      },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col className='px-0'>
        <Row className='mb-4'>
          <Col>
            <div className='mb-2'>
              <BackButton setTarget={setTargetUser} />
            </div>
            <ManageInfoCard
              user={user}
              userInfo={directorInfo}
              userToken={directorToken}
            />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <ListTitle title={`Báo cáo (${reports.total_reports})`} />
            <Row className='mb-2' xs={1} md={2}>
              <EqualHeight>
                {Object.keys(reports).length !== 0 &&
                reports.reports.map((report) => (
                  <Col className='mb-4' key={report.id}>
                    <ReportItem
                      report={report}
                    />
                  </Col>
                ))}
              </EqualHeight>
            </Row>
            {reports.total_reports > 0 &&
              <div className='d-flex justify-content-center'>
                <Pagination
                  pageCount={Math.ceil(reports.total_reports / REPORT_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </div>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ManageDetails;
