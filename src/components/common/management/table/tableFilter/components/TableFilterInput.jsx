// Essentials
import React, { useState, useEffect } from 'react';
import { Form, OverlayTrigger, Popover, Stack, Tooltip } from 'react-bootstrap';

// Assets
import { MdError, MdHelp } from 'react-icons/md';

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
      value={tempInput ? tempInput : ''}
    />
  </>);
};

export const TableFilterRange = ({
  range, setRange,
  placeholder,
}) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [tempRange, setTempRange] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (range.length === 0) setTempRange('');
  }, [range]);

  // Support functions --------------------------------------------------------
  const convertToRange = (str) => {
    // Empty string
    if (str.length === 0) return [];

    let result = [];
    let minChar = null; let maxChar = null;
    let commaCount = 0;

    // Check for correct format
    for (let i = 0; i < str.length; i++) {
      const c = str[i];

      if ('0123456789.'.includes(c)) continue;
      if ('[('.includes(c) && i === 0 && '0123456789'.includes(str[1])) {
        minChar = c;
        continue;
      }
      if ('])'.includes(c) && i === str.length - 1 && '0123456789'.includes(str[str.length - 2])) {
        maxChar = c;
        continue;
      }
      if (c === ',' && i > 1 && i < str.length - 2 && '[('.includes(str[0]) && '])'.includes(str[str.length - 1])) {
        commaCount += 1;
        if (commaCount <= 1) continue;
      }
      return null; 
    }

    // String only contains 1 number
    if (commaCount === 0) {
      const value = Number(str.slice(!minChar ? 0 : 1, str.length - (!maxChar ? 0 : 1)));
      if (isNaN(Number(value))) return null;
      let operator = '=';
      if (minChar && !maxChar) operator = (minChar === '[' ? '>=' : '>');
      else if (!minChar && maxChar) operator = (maxChar === ']' ? '<=' : '<');
      result = [{ operator, value }];
    } 
    // String contains 2 numbers
    else {
      const s = str.split(',');
      const values = {
        left: Number(s[0].slice(1)),
        right: Number(s[1].slice(0, s[1].length - 1))
      };
      if (isNaN(Number(values.left)) || isNaN(Number(values.right))) return null;
      const operators = {
        left: minChar === '[' ? '>=' : '>',
        right: maxChar === ']' ? '<=' : '<'
      }
      result = [
        { operator: operators.left, value: values.left },
        { operator: operators.right, value: values.right }
      ]
    }
    console.log(result);

    return result;
  };

  // --------------------------------------------------------------------------
  const onChange = (event) => {
    if (timeoutId) clearTimeout(timeoutId);
    let str = event.target.value;
    setTempRange(str);
    let result = convertToRange(str);
    if (!result) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const newTimeoutId = setTimeout(() => {
      setRange(result);
    }, 500);
    setTimeoutId(newTimeoutId);
  };

  // Popover
  const PopoverContent = () => {
    return (<>
      <div className='fw-bold'>Các định dạng đúng:</div>
      <div>• {'\"x\": Bằng x'}</div>
      <div>• {'\"(x\" / \"x)\": Lớn/bé hơn x'}</div>
      <div>• {'\"[x\" / \"x]\": Lớn/bé hơn hoặc bằng x'}</div>
      <div>• {'\"[x,y]\" / \"(x,y)\": Từ x đến y'}</div>
      <div className='fw-bold'>Một số ví dụ:</div>
      <div>• 3: Bằng 3</div>
      <div>• {'(3'}: Lớn hơn 3</div>
      <div>• {'5]'}: Bé hơn hoặc bằng 5</div>
      <div>• {'[3,5)'}: Lớn hơn hoặc bằng 3 và bé hơn 5</div>
      <div className='fw-bold'>Lưu ý:</div>
      <div>• Không được điền dấu cách</div>
    </>);
  };

  // --------------------------------------------------------------------------
  return (<>
    <Stack direction='horizontal' gap={2}>
      <Form.Control
        className='mn-table-filter-input'
        onChange={onChange}
        placeholder={placeholder}
        size='sm'
        value={tempRange}
      />
      {isError ? <>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip style={{ position: 'fixed' }}>
              Sai định dạng
            </Tooltip>
          }
        >
          <div className='d-flex align-items-center'>
            <MdError className='mn-table-filter-helper mn-red' />
          </div>
        </OverlayTrigger>
      </> : <>
        <OverlayTrigger
          placement='bottom'
          overlay={
            <Popover
              className='mn-user-item-static'
              style={{ position: 'fixed' }}
            >
              <Popover.Body>
                <PopoverContent />
              </Popover.Body>
            </Popover>
          }
        >
          <div className='d-flex align-items-center'>
            <MdHelp className='mn-table-filter-helper mn-green' />
          </div>
        </OverlayTrigger>
      </>}
    </Stack>
  </>);
};