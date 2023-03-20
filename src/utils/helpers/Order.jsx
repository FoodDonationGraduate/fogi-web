export const getStatus = (order) => {
  let label = 'Complete';
  let css = 'green';
  switch (order.status) {
    case 1:
      label = 'In-progress';
      css = 'yellow';
      break;
    case 2:
      label = 'Cancelled';
      css = 'red';
      break;
    default:
      label = 'Complete';
      css = 'green';
      break;
  }
  return { label, css };
};

export const getStep = (order) => {
  let header = 'Your order is waiting to be reviewed';
  switch (order.step) {
    case 0:
      header = 'Your order is waiting to be reviewed';
      break;
    case 1:
      header = 'A volunteer is picking up your order';
      break;
    case 2:
      header = 'The volunteer is delivering to you';
      break;
    default:
      header = 'Your food has arrived!';
  }
  return header;
};

export const getStepLabel = (step) => {
  let label = 'Ordered';
  switch (step) {
    case 0:
      label = 'Ordered';
      break;
    case 1:
      label = 'Processing';
      break;
    case 2:
      label = 'Delivering';
      break;
    default:
      label = 'Arrived';
  }
  return label;
};

export const getStepStatus = (step, currentStep) => {
  let status = 'unfinished';
  if (step < currentStep) status = 'finished';
  else if (step === currentStep) status = 'current';
  return status;
};