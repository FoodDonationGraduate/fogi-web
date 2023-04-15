import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle } from 'react-icons/md';

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

export const getStatusIdx = (idx) => {
  let label = 'Complete';
  let css = 'green';
  switch (idx) {
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

export const getStep = (step) => {
  let header = 'Your order is waiting to be reviewed';
  let label = 'Ordered';
  let icon = MdSmartphone;
  switch (step) {
    case 0:
      header = 'Your order is waiting to be reviewed';
      label = 'Ordered';
      icon = MdSmartphone;
      break;
    case 1:
      header = 'A volunteer is picking up your order';
      label = 'Processing';
      icon = MdLabelImportant;
      break;
    case 2:
      header = 'The volunteer is delivering to you';
      label = 'Delivering';
      icon = MdDeliveryDining;
      break;
    default:
      header = 'Your food has arrived!';
      label = 'Arrived';
      icon = MdCheckCircle;
  }
  return { header, label, icon };
};

export const getStepStatus = (step, currentStep) => {
  let status = 'unfinished';
  if (step < currentStep) status = 'finished';
  else if (step === currentStep) status = 'current';
  return status;
};