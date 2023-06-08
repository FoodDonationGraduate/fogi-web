// Essentials
import React from 'react';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const StatsCard = ({ stat }) => {
  const size = useResizer();

  return (
    <>
      <div className='stats-card'>
        <div className={size > 0 ? 'd-flex justify-content-between' : ''}>
          <div className='stats-card-label my-auto'>{stat.label}</div>
          <div className='stats-card-value'>{stat.value} {stat.unit}</div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
