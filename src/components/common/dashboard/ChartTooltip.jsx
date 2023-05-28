// Essentials
import React from 'react-bootstrap';

const ChartTooltip = ({ payload, label, active, unit }) => {
  return (
    <>
      {active && (
        <div className='chart-tooltip'>
          <p>{`${payload[0].value} ${unit}`}</p>
        </div>
      )}
    </>
  );
};

export default ChartTooltip;
