// Essentials
import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Style
import 'assets/css/director/HomePage.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const getUserType = (user_type) => {
  switch (user_type) {
    case 'donee': return 'Người nhận';
    case 'donor': return 'Người cho';
    default: return 'Tình nguyện viên';
  }
};

const ReportItem = ({
  report
}) => {
  let size = useResizer();
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    setReasons(report.reason.split('\n'));
  }, []);

  return (
    <>
      <div className='manage-card'>
        <EqualHeightElement name='manage-content'>
          <div className='manage-card-link mb-1'>
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
