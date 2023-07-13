// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';

// Utility
import { getStep, getStepStatus, convertStepToNumber, convertNumberToStep } from 'utils/helpers/Order.jsx';
import { getStateForStep } from 'utils/helpers/Request.jsx';

const StepItem = ({
  request,
  step,
  currentStep,
  isDonee,
  isDelivery=true
}) => {
  const stepOptions = getStep(convertNumberToStep(step, isDonee, isDelivery), isDonee, isDelivery);
  const { id, content } = getStateForStep(step, request)

  return (
    <>
      <Stack direction='vertical' gap={2}>
        <div className={`step-item step-item-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto`}>
          {stepOptions.icon}
        </div>
        <header className={`step-text step-text-${getStepStatus(step, convertStepToNumber(currentStep))} mx-auto text-center`}>
          {(step <= currentStep && content.not_pass) ? content.not_pass : content.pass}
        </header>
      </Stack>
    </>
  )
};

export default StepItem;
