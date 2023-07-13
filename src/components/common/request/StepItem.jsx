// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';

// Utility
import { getStatusIdx, getState, getStepIcon, getStepStyle } from 'utils/helpers/Request.jsx';

const StepItem = ({
  request,
  step
}) => {
  const { id, content } = getState({ request, step });
  const currentStep = getStatusIdx(request.status);
  const icon =  { icon: getStepIcon(step) };
  const stepStyle = getStepStyle(step, currentStep);

  return (
    <>
      <Stack direction='horizontal' gap={3}>
        <div className={`step-item step-item-${stepStyle}`}>
          <icon.icon className='step-item-icon' />
        </div>
        <div className={`step-text step-text-${stepStyle}`}>
          {(content.not_pass && currentStep <= step) ? content.not_pass : content.pass}
        </div>
      </Stack>
    </>
  )
};

export default StepItem;
