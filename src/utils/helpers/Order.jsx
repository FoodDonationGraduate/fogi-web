import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle, MdDirectionsWalk } from 'react-icons/md';

export const getStatus = (order) => {
  let label = 'Complete';
  let css = 'green';
  switch (order.status) {
    case 'pending':
      label = 'Chờ duyệt';
      css = 'grey';
      break;
    case 'accepted':
      label = 'Chấp nhận';
      css = 'blue';
      break;
    case 'shipping':
      label = 'Đang giao';
      css = 'yellow';
      break;
    case 'canceled':
      label = 'Đã hủy';
      css = 'red';
      break;
    default:
      label = 'Thành công';
      css = 'green';
      break;
  }
  return { label, css };
};

export const getStatusByIdx = (idx) => {
  let label = 'Complete';
  let css = 'green';
  switch (idx) {
    case 0:
      label = 'Chờ duyệt';
      css = 'grey'
      break;
    case 1:
      label = 'Chấp nhận';
      css = 'blue';
      break;
    case 2:
      label = 'Đang giao';
      css = 'yellow';
      break;
    case 4:
      label = 'Đã hủy';
      css = 'red';
      break;
    default:
      label = 'Thành công';
      css = 'green';
      break;
  }
  return { label, css };
};

export const getStep = (step, isDonee, isDelivery) => {
  let header = '';
  let label = '';
  let icon = MdSmartphone;
  switch (step) {
    case 'pending':
      header = 'Tình nguyện viên đang xem Yêu cầu của bạn';
      label = 'Chờ duyệt';
      icon = MdSmartphone;
      break;

    case 'accepted':
      header = 'Tình nguyện viên đã chấp nhận Yêu cầu';
      if (isDonee) {
        if (isDelivery) header += ' và chuẩn bị giao';
      } else {
        header = ' và chuẩn bị đến nhận Thực phẩm';
      }
      label = 'Chấp nhận';
      icon = MdLabelImportant;
      break;

    case 'shipping':
      header = 'Tình nguyện viên đang ';
      if (isDonee) {
        if (isDelivery) header += 'giao Thực phẩm đến bạn';
        else header += 'chờ bạn đến nhận Thực phẩm';
      } else {
        header += 'đến nhận Thực phẩm';
      }
      label = 'Đang ' + isDonee ? (isDelivery ? 'giao' : 'chờ') : 'đến';
      if (isDonee && !isDelivery) icon = MdDirectionsWalk;
      else icon = MdDeliveryDining;
      break;
    
    case 'canceled':
      header = 'Yêu cầu của bạn đã bị hủy';
      label = 'Đã hủy';
      icon = MdLabelImportant;
      break;
    
    default:
      if (isDonee) {
        if (isDelivery) header = 'Thực phẩm đã đến nơi';
        else header = 'Bạn đã đến nhận Thực phẩm';
      } else {
        header = 'Tình nguyện viên đã đến nhận Thực phẩm';
      }
      header += ' thành công!';
      label = 'Thành công';
      icon = MdCheckCircle;
  }
  return { header, label, icon };
};

export const convertStepToNumber = (step) => {
  let number = 0;
  switch (step) {
    case 'pending':
      number = 0;
      break;
    case 'accepted':
      number = 1;
      break;
    case 'shipping':
      number = 2;
      break;
    default:
      number = 3;
  }
  return number;
};

export const convertNumberToStep = (number) => {
  let step = '';
  switch (number) {
    case 0:
      step = 'pending';
      break;
    case 1:
      step = 'accepted';
      break;
    case 2:
      step = 'shipping';
      break;
    default:
      step = 'success';
  }
  return step;
};

export const getStepStatus = (step, currentStep) => {
  let status = 'unfinished';
  if (step < currentStep) status = 'finished';
  else if (step === currentStep) status = 'current';
  return status;
};