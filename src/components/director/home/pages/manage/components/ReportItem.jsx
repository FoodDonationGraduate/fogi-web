// Essentials
import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';
import { useNavigate } from 'react-router';

// Style
import 'assets/css/director/HomePage.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const getUserType = (user_type) => {
  switch (user_type) {
    case 'donee': return 'Người nhận';
    case 'donor': return 'Người quyên góp';
    default: return 'Tình nguyện viên';
  }
};

const ReportItem = ({
  report
}) => {
  let size = useResizer();
  const [reasons, setReasons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setReasons(report.reason.split('\n'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='manage-card'>
        <EqualHeightElement name='manage-content'>
          <div className='manage-card-link mb-1'
            onClick={() => navigate(`/director/request/${report.request_type === 'take' ? 'donee' : 'donor'}/${report.request_id}`)}>
            Yêu cầu {report.request_id}
          </div>
      
          <div className='manage-card-primary'>
            {reasons.length > 0 && reasons.map((reason, idx) => (
              <div key={idx}>- {reason}</div>
            ))}
          </div>
        </EqualHeightElement>

        <hr />

        <EqualHeightElement name='manage-info'>
          <Stack className='mb-2' direction='horizontal' gap={4}>
            <img className='profile-logo-sm' src={`https://bachkhoi.online/static/${report.reporter_avatar}`} alt='director logo'/>
            <div>
              <h5 className='manage-card-name pb-2'>
                {report.reporter_name}
              </h5>
              <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                {getUserType(report.reporter_type)}
              </span>
            </div>
          </Stack>
        </EqualHeightElement>
      </div>
    </>
  );
};

export default ReportItem;
