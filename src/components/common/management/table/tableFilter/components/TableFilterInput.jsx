// Essentials
import React, { useState } from 'react';

export const TableFilterText = ({
  input, setInput,
  placeholder
}) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const onChange = (event) => {
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => setInput(event.target.value), 500);
    setTimeoutId(newTimeoutId);
  };

  return (<>
    <input 
      className='mn-table-filter-input mn-table-filter-input-small'
      onChange={onChange}
      placeholder={placeholder}
    />
  </>);
};