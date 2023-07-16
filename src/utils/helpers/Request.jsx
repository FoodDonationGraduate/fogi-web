// Assets
import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle, MdDirectionsWalk } from 'react-icons/md';

// Data
import State from 'utils/constants/State.json';

export const getStatusIdx = (status) => {
  const state = State.allStates.find(s => s.status == status);
  return state.id;
};

export const getStepStatus = (step) => {
  const state = State.allStates.find(s => s.id == step);
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
  };
};

export const getState = ({ request, step }) => {
  let user = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
  const user_type = user.user_type;
  
  const findCondition = (s) => {
    return step !== undefined ? s.id == step : s.status == request.status;
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
      current.condition.find(c => c.user_type == condition.user_type && c.delivery_type == condition.delivery_type)) {
      content = current;
      break;
    }
  }

  if (content.pass && content.text) {
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
  }
  

  return { id: state.id, color: state.color, content };
};