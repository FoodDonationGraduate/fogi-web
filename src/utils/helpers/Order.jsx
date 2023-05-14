import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle } from 'react-icons/md';

export const getStatus = (order) => {
  let label = 'Complete';
  let css = 'green';
  switch (order.status) {
    case 'pending':
      label = 'Chờ duyệt';
      css = 'blue'
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
      css = 'blue'
      break;
    case 1:
      label = 'Đang giao';
      css = 'yellow';
      break;
    case 2:
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

export const getStep = (step) => {
  let header = 'Bạn đã tạo Yêu cầu thành công';
  let label = 'Đã tạo';
  let icon = MdSmartphone;
  switch (step) {
    case 'init':
      header = 'Bạn đã tạo Yêu cầu thành công';
      label = 'Đã tạo';
      icon = MdSmartphone;
      break;
    case 'pending':
      header = 'Tình nguyên viên đang kiểm tra Yêu cầu';
      label = 'Chờ duyệt';
      icon = MdLabelImportant;
      break;
    case 'shipping':
      header = 'Tình nguyện viên đang giao hàng đến bạn';
      label = 'Đang giao';
      icon = MdDeliveryDining;
      break;
    case 'canceled':
      header = 'Yêu cầu của bạn đã bị hủy';
      label = 'Đã hủy';
      icon = MdLabelImportant;
      break;
    default:
      header = 'Các món ăn đã đến nơi!';
      label = 'Xác nhận';
      icon = MdCheckCircle;
  }
  return { header, label, icon };
};

export const convertStepToNumber = (step) => {
  let number = 0;
  switch (step) {
    case 'init':
      number = 0;
      break;
    case 'pending':
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
      step = 'init';
      break;
    case 1:
      step = 'pending';
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