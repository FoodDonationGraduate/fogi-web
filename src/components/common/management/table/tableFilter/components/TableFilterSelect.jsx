// Essentials
import React from 'react';
import { Form } from 'react-bootstrap';

const TableFilterSelect = ({
  activeOption, setActiveOption,
  optionList
}) => {  
  const onChange = (event) => {
    setActiveOption(optionList.find(option => option.value === event.target.value));
  };

  return (<>
    <Form.Select
      className='mn-table-filter-input'
      onChange={onChange}
      size='sm'
      value={activeOption.value}
    >
      {optionList && optionList.map((option, idx) => (
        <option key={idx} value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  </>);
};

export default TableFilterSelect;