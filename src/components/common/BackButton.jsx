// Essential
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Assets
import { MdChevronLeft } from 'react-icons/md';

const BackButton = ({
  setTargetList=[]
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onNavigate = () => {
    if (setTargetList.length === 0) navigate(-1);
    else for (let i = 0; i < setTargetList.length; i++) {
      const setFunc = setTargetList[i];
      if (setFunc.isReducer) dispatch(setFunc.setTarget(null));
      else setFunc.setTarget(null);
    }
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
