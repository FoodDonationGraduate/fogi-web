// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

// Components
import Pill from './Pill';
import UtilityPill from './UtilityPill';

// Style imports
import './Pagination.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const Pagination = ({
  pageCount,
  activeIdx,
  onChangePage
}) => {
  let size = useResizer();

  const [shownPills, setShownPills] = useState([]);
  const getShownPills = () => {
    const pills = [];
    pills.push(-2);
    const smallSize = 2 * Number(size < 1);
    
    // Case 1: [0]-1-2-3-4-5-6
    if (pageCount <= 7 - smallSize) {
      for (let i = 0; i < pageCount; i++) pills.push(i);
    }
    else {
      const firstIdx = 0;
      const lastIdx = pageCount - 1;
      const leftIdx = activeIdx - 1;
      const rightIdx = activeIdx + 1;

      // Case 2: 0-1-2-[3]-4-...-14 (14 is just an example index)
      if (Math.abs(activeIdx - firstIdx) <= 1) {
        for (let i = 0; i <= 4 - smallSize; i++) {
          pills.push(i);
        }
        pills.push(-1); pills.push(lastIdx);
      }
  
      // Case 3: 0-...-10-[11]-12-13-14
      else if (Math.abs(activeIdx - lastIdx) <= 1) {
        pills.push(firstIdx); pills.push(-1);
        for (let i = lastIdx - 4 + smallSize; i <= lastIdx; i++) {
          pills.push(i);
        }
      }
  
      // Case 4: 0-...5-[6]-7-...-14
      else {
        pills.push(firstIdx); pills.push(-1);
        if (smallSize) pills.push(activeIdx);
        else {
          for (let i = leftIdx; i <= rightIdx; i++)
            pills.push(i);
        }
        pills.push(-1); pills.push(lastIdx);
      }
    }
    pills.push(-3);
    return pills;
  };

  useEffect(() => {
    setShownPills(getShownPills());
  }, [activeIdx, size, pageCount]);

  return (
    <>
      {pageCount > 1 && 
        <Stack direction='horizontal' gap={size < 1 ? 1 : 2}>
          {shownPills.map((pillIdx, index) => 
            <div key={index}>
              {pillIdx > -1 ?
                <Pill
                  idx={pillIdx}
                  isActive={pillIdx === activeIdx}
                  onChangePage={onChangePage}
                />
                :
                <UtilityPill
                  idx={pillIdx}
                  activeIdx={activeIdx}
                  pageCount={pageCount}
                  onChangePage={onChangePage}
                />
              }
            </div>
          )}
        </Stack>
      }
    </>
  );
};

export default Pagination;