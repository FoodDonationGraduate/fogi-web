// Assets
import { MdSmartphone, MdLabelImportant, MdDeliveryDining, MdCheckCircle, MdDirectionsWalk } from 'react-icons/md';

// Data
import State from 'utils/constants/State.json';

export const getState = (request) => {
  let user = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
  const user_type = user.user_type;
  
  const state = State.allStates.find(s => s.status == request.status);
  let content = {};
  for (let i = 0; i < state.content.length; i++) {
    const current = state.content[i]; // current content
    if (current.condition.length === 0 || current.condition.includes(
      {
        user_type,
        delivery_type: request.delivery_type ? request.delivery_type : 'give'
      }
    )) {
      content = current;
      break;
    }
  }

  return { id: state.id, content };
};

export const getStateForStep = (step, request) => {
  let user = localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : {};
  const user_type = user.user_type;
  
  const state = State.allStates.find(s => s.id == step);

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

  return { id: state.id, content };
}