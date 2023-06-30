// Essentials
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import StatsCard from './StatsCard';

const StatsList = ({ stats }) => {
  const [statSize, setStatSize] = useState([2, 3]); // [md, xl]

  const getStatSize = () => {
    for (let i = 0; i < stats.stats.length; i++) {
      if (stats.stats[i].label.length > 30) return [1, 1];
      else if (stats.stats[i].label.length > 20) return [1, 2];
    }
    return [2, 3];
  };

  useEffect(() => {
    if (Object.keys(stats).length !== 0) setStatSize(() => getStatSize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]); 
  
  return (
    <>
      <Row xs={1} md={statSize[0]} xl={statSize[1]}>
        {Object.keys(stats).length !== 0 && stats.stats.map((stat, idx) => (
          <Col className='mb-3' key={idx}>
            <StatsCard stat={stat} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StatsList;