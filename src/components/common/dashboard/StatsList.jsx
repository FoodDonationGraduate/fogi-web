// Essentials
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import StatsCard from './StatsCard';

const StatsList = ({ stats }) => {
  const [statSize, setStatSize] = useState([2, 3]); // [md, xl]

  const getStatSize = () => {
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].label.length > 30) return [1, 1];
      else if (stats[i].label.length > 15) return [1, 2];
    }
    return [2, 3];
  };

  useEffect(() => {
    setStatSize(getStatSize());
  }, []); 
  
  return (
    <>
      <Row xs={1} md={statSize[0]} xl={statSize[1]}>
        {stats.map((stat, idx) => (
          <Col className='mb-3' key={idx}>
            <StatsCard stat={stat} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StatsList;