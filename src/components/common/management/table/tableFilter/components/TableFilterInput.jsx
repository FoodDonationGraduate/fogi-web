// Essentials
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export const TableFilterText = ({
  input, setInput,
  placeholder
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [tempInput, setTempInput] = useState('');

  const onChange = (event) => {
    setTempInput(event.target.value);

    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => setInput(event.target.value), 500);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setTempInput(input);
  }, [input]);

  return (<>
    <Form.Control
      className='mn-table-filter-input'
      onChange={onChange}
      placeholder={placeholder}
      size='sm'
      value={tempInput}
    />
  </>);
};