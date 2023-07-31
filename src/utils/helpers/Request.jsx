// Assets
import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle } from 'react-icons/md';

// Data
import State from 'utils/constants/State.json';

export const getStatusIdx = (status) => {
  const state = State.allStates.find(s => s.status === status);
  return state.id;
};

export const getStatusTitle = (status) => {
  const state = State.allStates.find(s => s.status === status);
  return state.content[0].chip;
};

export const getStatusColor = (status) => {
  const state = State.allStates.find(s => s.status === status);
  return state.color;
};

export const getStepStatus = (step) => {
  const state = State.allStates.find(s => s.id === step);
  return state.status;
};

export const getStepStyle = (step, currentStep) => {
  let status = 'unfinished';
  if (step < currentStep) status = 'finished';
  else if (step === currentStep) status = 'current';
  return status;
};

export const getStepIcon = (step) => {
  switch (step) {
    case 0: return MdSmartphone; 
    case 1: return MdLabelImportant; 
    case 2: return MdLabelImportant; 
    case 3: return MdDeliveryDining; 
    case 4: return MdDeliveryDining; 
    case 5: return MdCheckCircle; 
    default: return;
  };
};

export const getState = ({ request, step }) => {
  let user = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
  const user_type = user.user_type;
  
  const findCondition = (s) => {
    return step !== undefined ? s.id === step : s.status === request.status;
  };
  const state = State.allStates.find(s => findCondition(s));

  let content = {};
  const condition = {
    user_type: user_type,
    delivery_type: request.delivery_type ? request.delivery_type : 'give'
  };

  for (let i = 0; i < state.content.length; i++) {
    const current = state.content[i]; // current content

    if (current.condition.length === 0 ||
      current.condition.find(c => c.user_type === condition.user_type && c.delivery_type === condition.delivery_type)) {
      content = structuredClone(current);
      break;
    }
  }

  if (content.pass && content.text) {

    if (request.status === 'canceled') {
      let role = '';
      switch (request.cancel_user_role) {
        case 'director': role = 'Điều phối viên'; break;
        case 'donor': role = 'Người quyên góp'; break;
        case 'donee': role = 'Người nhận'; break;
        case 'volunteer': role = 'Tình nguyện viên'; break;
        case 'warehouse_keeper': role = 'Quản lý kho'; break;
        default: return;
      }

      content.text = content.text.replace(`{user_role}`, role);
      content.text = content.text.replace(`{user_role_name}`, request.cancel_user_name);
    }
    else {
      if (request.user) {
        content.pass = content.pass.replace(`{${request.user.user_type}_name}`, request.user.name);
        content.text = content.text.replace(`{${request.user.user_type}_name}`, request.user.name);
      }
    
      if (request.volunteer) {
        content.pass = content.pass.replace(`{volunteer_name}`, request.volunteer.name);
        content.text = content.text.replace(`{volunteer_name}`, request.volunteer.name);
      }
    
      if (request.director) {
        content.pass = content.pass.replace(`{director_name}`, request.director.name);
        content.text = content.text.replace(`{director_name}`, request.director.name);
      }

      if (request.warehouse_keeper) {
        content.pass = content.pass.replace(`{warehouse_keeper_name}`, request.warehouse_keeper.name);
        content.text = content.text.replace(`{warehouse_keeper_name}`, request.warehouse_keeper.name);
      }
    }
  }
  

  return { id: state.id, color: state.color, content };
};