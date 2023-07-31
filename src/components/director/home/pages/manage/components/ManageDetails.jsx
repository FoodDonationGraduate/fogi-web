// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { retrieveReports } from 'components/redux/reducer/DirectorReducer';

// Components
import ManageInfoCard from './ManageInfoCard';
import ReportItem from './ReportItem';
import Pagination from 'components/common/pagination/Pagination';
import BackButton from 'components/common/BackButton';
import ManageRequestList from './ManageRequestList';
import ManageStatistics from './ManageStatistics';

const ManageDetails = ({ user }) => {
  const reports = useSelector(state => state.directorReducer.reports);
  const directorInfo = useSelector(state => state.authenticationReducer.user);
  const directorToken = useSelector(state => state.authenticationReducer.token);
  const REPORT_COUNT = 4; // per page
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePage = async (idx) => {
    setPage(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  
  useEffect(() => {
    setPage(0);
    dispatch(retrieveReports(
      {
        limit: REPORT_COUNT,
        offset: page * REPORT_COUNT,
        reportee_email: user.email
      }, {
        userInfo: directorInfo,
        userToken: directorToken
      },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Row>
      <Col className='px-0'>
        <Row className='mb-4'>
          <Col>
            <div className='mb-2'>
              <BackButton setTargetList={[]} />
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
            <Accordion>
              
              <Accordion.Item eventKey="0" className='mt-4'>
                <Accordion.Header>
                  <h3>Thống kê</h3>
                </Accordion.Header>
                <Accordion.Body className='bg'>
                  <ManageStatistics 
                    user={user}
                    userInfo={directorInfo}
                    userToken={directorToken}/>
                </Accordion.Body>
              </Accordion.Item>


              <Accordion.Item eventKey="1" className='mt-4'>
                <Accordion.Header>
                  <h3>Báo cáo ({reports.total_reports})</h3>
                </Accordion.Header>
                <Accordion.Body className='bg'>
                  <Row className='mb-2' xs={1} md={2} >
                    <EqualHeight>
                      {Object.keys(reports).length !== 0 &&
                      reports.reports.map((report) => (
                        <Col className='mb-4' key={report.id}>
                          <EqualHeightElement>
                            <ReportItem
                              report={report}
                            />
                          </EqualHeightElement>
                          
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
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="2" className='mt-4'>
                <Accordion.Header>
                  <h3>Danh sách yêu cầu</h3>
                </Accordion.Header>
                <Accordion.Body className='bg'>
                  <ManageRequestList user={user}/>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ManageDetails;
