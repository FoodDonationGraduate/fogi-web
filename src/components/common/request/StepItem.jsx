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
  const stepOptions = getStep(convertNumberToStep(step, isDonee, isDelivery), isDonee, isDelivery);

  return (
    <>
      <Stack direction='vertical' gap={2}>
        <div className={`step-item step-item-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto`}>
          {stepOptions.icon}
        </div>
        <header className={`step-text step-text-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto text-center`}>
          {stepOptions.label}
        </header>
      </Stack>
    </>
  )
};

export default StepItem;
