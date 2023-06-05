// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';

// Utility
import { getStep, getStepStatus, convertStepToNumber, convertNumberToStep } from 'utils/helpers/Order.jsx';

const StepItem = ({
  step,
  currentStep,
  isDonee,
  isDelivery=true
}) => {
  const stepOptions = getStep(convertNumberToStep(step), isDonee, isDelivery);

  return (
    <>
      <Stack direction='vertical' gap={2}>
        <div className={`step-item step-item-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto`}>
          {stepOptions.icon}
        </div>
        <h5 className={`step-text-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto text-center`}>
          {stepOptions.label}
        </h5>
      </Stack>
    </>
  )
};

export default StepItem;
