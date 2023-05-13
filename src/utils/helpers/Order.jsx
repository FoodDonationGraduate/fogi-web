import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle } from 'react-icons/md';

export const getStatus = (order) => {
  let label = 'Complete';
  let css = 'green';
  switch (order.status) {
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
    case 0:
      header = 'Bạn đã tạo Yêu cầu thành công';
      label = 'Đã tạo';
      icon = MdSmartphone;
      break;
    case 1:
      header = 'Tình nguyên viên đang kiểm tra Yêu cầu';
      label = 'Chờ duyệt';
      icon = MdLabelImportant;
      break;
    case 2:
      header = 'Tình nguyện viên đang giao hàng đến bạn';
      label = 'Đang giao';
      icon = MdDeliveryDining;
      break;
    default:
      header = 'Các món ăn đã đến nơi!';
      label = 'Xác nhận';
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