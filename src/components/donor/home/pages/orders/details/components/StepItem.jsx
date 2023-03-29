// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle } from 'react-icons/md'

// Utility
import { getStep, getStepStatus } from 'utils/helpers/Order.jsx';

const StepItem = ({
  step,
  currentStep
}) => {

  return (
    <>
      <Stack direction='vertical' gap={2}>
        <div className={`step-item step-item-${getStepStatus(step, currentStep)} mx-auto`}>
          {step === 0 &&
            <MdSmartphone className='step-item-icon' />
          }
          {step === 1 &&
            <MdLabelImportant className='step-item-icon' />
          }
          {step === 2 &&
            <MdDeliveryDining className='step-item-icon' />
          }
          {step === 3 &&
            <MdCheckCircle className='step-item-icon' />
          }
        </div>
        <h5 className={`step-text-${getStepStatus(step, currentStep)} mx-auto`}>
          {getStep(step).label}
        </h5>
      </Stack>
    </>
  )
};

export default StepItem;
