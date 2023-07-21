// Essentials
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

// Support functions
const convertToInt = (str) => {
  if (isNaN(parseInt(str))) return '';
  return parseInt(str);
};

export const TableFilterText = ({
  input, setInput,
  placeholder,
  type='default'
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [tempInput, setTempInput] = useState('');

  const onChange = (event) => {
    let str = event.target.value;
    if (type === 'int') str = convertToInt(str);

    setTempInput(str);

    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => setInput(str), 500);
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

export const TableFilterRange = ({
  range, setRange,
  placeholder,
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [tempRange, setTempRange] = useState('');

  // Support functions
  const convertToRange = (str) => {
    let result = [];
    let values = { left: null, right: null };

    // Check for correct format
    for (let i = 0; i < str.length; i++) {
      const c = str[i];

      if ('0123456789'.includes(c)) continue
      if ('[('.includes(c) && i === 0 && '0123456789'.includes(str[1])) continue;
      if ('])'.includes(c) && i === str.length - 1 && '0123456789'.includes(str[str.length - 2])) continue;
      if (c === ',' && i > 1 && i < str.length - 2 && (str.includes('[') && str.includes('[')) && (str.includes('[') && str.includes('['))) continue;
      alert('incorrect format');
      return null; 
    }
  };

  const onChange = (event) => {
    let str = event.target.value;
    setTempRange(str);

    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => convertToRange(str), 500);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setTempRange(range);
  }, [range]);

  return (<>
    <Form.Control
      className='mn-table-filter-input'
      onChange={onChange}
      placeholder={placeholder}
      size='sm'
      value={tempRange}
    />
  </>);
};