import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle, MdDirectionsWalk } from 'react-icons/md';

export const getStatus = (order) => {
  let label = 'Complete';
  let css = 'green';
  switch (order.status) {
    case 'pending':
      label = 'Chờ duyệt';
      css = 'grey';
      break;
    case 'finding':
      label = 'Đang tìm';
      css = 'blue';
      break;
    case 'receiving':
      label = 'Đang nhận';
      css = 'yellow';
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
      label = 'Đang tìm';
      css = 'blue';
      break;
    case 2:
      label = 'Đang nhận';
      css = 'yellow';
      break;
    case 3:
      label = 'Đang giao';
      css = 'yellow';
      break;
    case 5:
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

export const getStep = (step, isDonee, isDelivery, order) => {
  let header = '';
  let label = '';
  let icon = <MdSmartphone className='step-item-icon' />;
  let currentRole = isDonee ? 'donee' : 'donor';
  switch (step) {
    case 'pending':
      header = `Đang chờ ${!isDonee ? 'một ' : ''}Điều phối viên duyệt Yêu cầu`;
      label = 'Chờ duyệt';
      icon = <MdSmartphone className='step-item-icon' />;
      break;

    case 'finding':
      header = 'Đang tìm Tình nguyện viên cho bạn';
      label = 'Đang tìm';
      icon = <MdLabelImportant className='step-item-icon' />;
      break;

    case 'receiving':
      header = 'Tình nguyện viên đang đến nhận Thực phẩm từ ';
      if (isDonee) {
        header += 'kho'
      } else {
        header += 'bạn';
      }
      label = 'Đang nhận';
      icon = <MdDeliveryDining className='step-item-icon' />;
      break;

    case 'shipping':
      header = 'Tình nguyện viên đang ';
      if (isDonee) {
        if (isDelivery) header += 'giao Thực phẩm đến bạn';
        else header = 'Bạn đang đến nhận Thực phẩm';
      } else {
        header += 'đến giao Thực phẩm đến kho';
      }
      label = 'Đang giao';
      if (isDonee && !isDelivery) icon = <MdDirectionsWalk className='step-item-icon' />;
      else icon = <MdDeliveryDining className='step-item-icon' />;
      break;
    
    case 'canceled':
      header = 'Yêu cầu của bạn đã bị hủy bởi ' 
      if (order.cancel_user_role === currentRole) {
        header += 'bạn';
      } else {
        header += order.cancel_user_role === 'volunteer' ? ' Tình nguyện viên' : 'Điều phối viên'
      }
      label = 'Đã hủy';
      icon = <MdLabelImportant className='step-item-icon' />;
      break;
    
    default:
      if (isDonee) {
        if (isDelivery) header = 'Thực phẩm đã đến nơi';
        else header = 'Bạn đã nhận Thực phẩm';
      } else {
        header = 'Tình nguyện viên đã giao Thực phẩm tới kho';
      }
      header += ' thành công!';
      label = 'Thành công';
      icon = <MdCheckCircle className='step-item-icon' />;
  }
  return { header, label, icon };
};

export const convertStepToNumber = (step) => {
  let number = 0;
  switch (step) {
    case 'pending':
      number = 0;
      break;
    case 'finding':
      number = 1;
      break;
    case 'receiving':
      number = 2;
      break;
    case 'shipping':
      number = 3;
      break;
    default:
      number = 4;
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
      step = 'finding';
      break;
    case 2:
      step = 'receiving';
      break;
    case 3:
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