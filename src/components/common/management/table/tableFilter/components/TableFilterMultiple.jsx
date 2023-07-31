// Essentials
import React, { useState } from 'react';
import { Form, Modal, OverlayTrigger, Tooltip, Stack } from 'react-bootstrap';

// Assets
import { MdAdd } from 'react-icons/md';

// Components
import { TableItemIcon } from 'components/common/management/table/tableItem/TableItemComponent';
import {
  TableItemImage
} from 'components/common/management/table/tableItem/TableItemComponent';

export const MultipleItem = ({
  activeOptionList, setActiveOptionList,
  currentOption
}) => {

  const onChange = (event) => {
    const currentIdx = activeOptionList.map(option => option.value).indexOf(currentOption.value);
    if (activeOptionList.find(option => option.value === currentOption.value)) {
      setActiveOptionList([
        ...activeOptionList.slice(0, currentIdx),
        ...activeOptionList.slice(currentIdx + 1)
      ]);
    } else {
      setActiveOptionList([
        ...activeOptionList,
        currentOption
      ]);
    }
  };

  return (<>
    <Stack direction='horizontal' gap={2}>
      <Form.Check
        checked={activeOptionList.find(option => option.value === currentOption.value) ? true : false}
        onChange={onChange}
      />
      {currentOption.image &&
        <TableItemImage image={currentOption.image} size='sm' />
      }
      <div>{currentOption.label}</div>
    </Stack>
    </>);
};

export const MultipleDisplayItem = ({
  activeOptionList, setActiveOptionList,
  currentOption
}) => {

  const onClick = () => {
    const currentIdx = activeOptionList.map(option => option.value).indexOf(currentOption.value);
    setActiveOptionList([
      ...activeOptionList.slice(0, currentIdx),
      ...activeOptionList.slice(currentIdx + 1)
    ]);
  };

  return (<>
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip style={{ position: 'fixed' }}>Bỏ chọn {currentOption.label}</Tooltip>
      }
    >
      <div
        className='d-flex align-items-center'
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <img
          className='mn-table-item-image-sm'
          src={`https://bachkhoi.online/static/${currentOption.image}`}
          alt='current option'
        />
      </div>
    </OverlayTrigger>
  </>);
};

export const MultipleFilterModal = ({
  show, onHide,
  title,
  activeOptionList, setActiveOptionList,
  optionList
}) => {

  return (<>
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        {title}
      </Modal.Header>
      <Modal.Body>
        {optionList.map((option, idx) => (
          <MultipleItem
            key={idx}
            activeOptionList={activeOptionList} setActiveOptionList={setActiveOptionList}
            currentOption={option}
          />
        ))}
      </Modal.Body>
    </Modal>
  </>);
};

const TableFilterMultiple = ({
  title,
  activeOptionList, setActiveOptionList,
  optionList,
  addTip
}) => {
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onHide = () => setShow(false);

  return (<>
    <Stack className='d-flex align-items-center' direction='horizontal'>
      {activeOptionList && activeOptionList.map((option, idx) => (<div key={idx}>
        {option.image &&
          <MultipleDisplayItem 
            activeOptionList={activeOptionList} setActiveOptionList={setActiveOptionList}
            currentOption={option}
          />
        }
      </div>))}
      <div
        style={{ cursor: 'pointer' }}
        onClick={onShow}
      >
        <TableItemIcon icon={{ icon: MdAdd, tip: addTip }} />
      </div>
    </Stack>
    <MultipleFilterModal
      show={show} onHide={onHide}
      title={title}
      activeOptionList={activeOptionList} setActiveOptionList={setActiveOptionList}
      optionList={optionList}
    />
  </>);
};

export default TableFilterMultiple;
