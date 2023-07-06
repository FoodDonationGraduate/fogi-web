// Essential
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Assets
import { MdChevronLeft } from 'react-icons/md';

const BackButton = ({
  setTarget=undefined
}) => {
  const navigate = useNavigate();
  const onNavigate = () => {
    if (!setTarget) navigate(-1);
    else setTarget(null);
  };

  return (
    <div className='back-btn' onClick={onNavigate}>
      <Stack direction='horizontal' gap={2}>
        <MdChevronLeft />
        <div>
          Quay lại
        </div>
      </Stack>
    </div>
  )
};

export default BackButton;
