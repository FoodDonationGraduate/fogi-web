import { getToken } from 'firebase/messaging';
import firebaseInstance from "services/axios/firebaseConfig";
import { getMessaging, onMessage } from "firebase/messaging";

import { retrieveAllNotifications, sendDeviceToken } from 'components/redux/reducer/NotificationReducer';
import { retrieveRequest } from 'components/redux/reducer/RequestReducer';
import { retrieveCurrentRequest } from 'components/redux/reducer/DirectorReducer';

// Data
import State from 'utils/constants/State.json';

const messaging = getMessaging(firebaseInstance);

export const getMessagingObject = () => {return messaging};

export const requestForToken = (messaging, dispatch, navigate, user) => {
  return getToken(messaging, { vapidKey: "BBCATjFAqmgnBXuNb2rc5hDjj79pBh-ej-tmZJHGjx1zadpWLk0oqoQD7r5ZR1rgg_6ZlgIKVslOInl-Px8c4mU" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        dispatch(sendDeviceToken({device_token: currentToken}, user, navigate))
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export function enableNotification (dispatch, navigate, user) {
    window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          requestForToken(messaging, dispatch, navigate, user);
        } else {
          console.log('Notification permission ungranted.');
        }
    });
}

export const handleNotificationPayload = (payload, dispatch, setModalMessage, showModal) => {
  console.log(payload);
  if (payload && payload.data) {
    var data = payload.data;
    var request_id = data.request_id;
    var request_status = data.request_status;
    var modalMessage = '';
    if (data.code === '100') { // to donee
      var delivery_type = data.delivery_type;
      if (delivery_type === 'delivery') {
        switch (request_status) {
          case 'finding':
            modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận và đang được điều phối`;
            break;
          case 'receiving':
            modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
            break;
          case 'shipping':
            modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến bạn`;
            break;
          case 'canceled':
            modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu ${request_id} đã thành công`;
        }
      } else {
        switch (request_status) {
          case 'accepted':
            modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận. Bạn có thể đến nhận thực phẩm tại kho`;
            break;
          case 'receiving':
            modalMessage = `Bạn đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
            break;
          case 'canceled':
            modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu ${request_id} đã thành công`;
        }
      }
    } else if (data.code === '300') { // to donor
      switch (request_status) {
        case 'finding':
          modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận và đang được điều phối`;
          break;
        case 'receiving':
          modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm từ bạn theo yêu cầu ${request_id}`;
          break;
        case 'shipping':
          modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến kho`;
          break;
        case 'canceled':
          modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
          break;
        default:
          modalMessage = `Yêu cầu ${request_id} đã thành công`;
      }
    } else if (data.code === '400') { // to director
      var request_from = data.request_from;
      if (request_from === 'donor') {
        switch (request_status) {
          case 'rejected':
            modalMessage = `Tình nguyện viên đã từ chối nhận yêu cầu ${request_id}`;
            break;
          case 'receiving':
            modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm từ Người quyên góp theo yêu cầu ${request_id}`;
            break;
          case 'shipping':
            modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến kho`;
            break;
          case 'canceled':
            modalMessage = `Yêu cầu quyên góp ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu quyên góp ${request_id} đã thành công`;
        }
      } else {
        if (delivery_type === 'delivery') {
          switch (request_status) {
            case 'rejected':
              modalMessage = `Tình nguyện viên đã từ chối nhận yêu cầu ${request_id}`;
              break;
            case 'receiving':
              modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
              break;
            case 'shipping':
              modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến Người nhận quyên góp`;
              break;
            case 'canceled':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        } else {
          switch (request_status) {
            case 'receiving':
              modalMessage = `Người nhận quyên góp đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
              break;
            case 'canceled':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        }
      }
    } else { // to warehousekeeper
      if (request_from === 'donor') {
        switch (request_status) {
          case 'receiving':
            modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm từ Người quyên góp theo yêu cầu ${request_id}`;
            break;
          case 'shipping':
            modalMessage = `Tình nguyện viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến kho`;
            break;
          case 'canceled':
            modalMessage = `Yêu cầu quyên góp ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu quyên góp ${request_id} đã thành công`;
        }
      } else {
        if (delivery_type === 'delivery') {
          switch (request_status) {
            case 'receiving':
              modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
              break;
            case 'shipping':
              modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến Người nhận quyên góp`;
              break;
            case 'canceled':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        } else {
          switch (request_status) {
            case 'receiving':
              modalMessage = `Người nhận quyên góp đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
              break;
            case 'canceled':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        }
      }
    }
    if (modalMessage !== '') {
      dispatch(setModalMessage(modalMessage));
      dispatch(showModal());
    }
  }
}

export const handleNotificationReload = (data, userInfo, userToken, location, dispatch, navigate) => {
  var user_type= userInfo.user_type;
  var request_id = data.request_id;
  var noti_type = '';
  if (user_type === 'donor' && location === `/donor/request/${request_id}` && data.code === '300') {
    dispatch(retrieveRequest({request_id: request_id}, {userInfo, userToken}, navigate));
  } else if (user_type === 'donee' && location === `/request/${request_id}` && data.code === '100') {
    dispatch(retrieveRequest({request_id: request_id}, {userInfo, userToken}, navigate));
  } else if (user_type === 'director' && location === `/director/request/${data.request_from}/${request_id}` && data.code === '400') {
    dispatch(retrieveCurrentRequest({request_from: data.request_from, request_id: request_id}, {userInfo, userToken}, navigate));
    noti_type = data.request_from === 'donor' ? 'give' : 'take' + '_request_state_change';
  } else {
    dispatch(retrieveCurrentRequest({request_from: data.request_from, request_id: request_id}, {userInfo, userToken}, navigate))
    noti_type = data.request_from === 'donor' ? 'give' : 'take' + '_request_state_change';
  }
  dispatch(retrieveAllNotifications({limit: 20, offset: 0, noti_type: noti_type}, {userInfo, userToken}, navigate))
}

export const exportNotiElementContent = (data, userInfo, delivery_type) => {
  var request_status = data.request_status;
  var sender_name = data.sender_name;
  var sender_role = data.sender_role;
  var user_type = userInfo.user_type;
  let content = {};
  const findCondition = (s) => {
    return s.status == data.request_status;
  };
  const state = State.allStates.find(s => findCondition(s));
  const condition = {
    user_type: user_type,
    delivery_type: data.noti_type === 'give' ? data.noti_type : (data.delivery_type === 'delivery' ? data.delivery_type : 'pickup')
  };

  for (let i = 0; i < state.content.length; i++) {
    const current = state.content[i]; // current content

    if (current.condition.length === 0 ||
      current.condition.find(c => c.user_type == condition.user_type && c.delivery_type == condition.delivery_type)) {
      content = structuredClone(current);
      break;
    }
  }

  if (request_status === 'canceled' || request_status === 'rejected') {
    let role = '';
    switch (sender_role) {
      case 'director': role = 'Điều phối viên'; break;
      case 'donor': role = 'Người quyên góp'; break;
      case 'donee': role = 'Người nhận'; break;
      case 'volunteer': role = 'Tình nguyện viên'; break;
      case 'warehouse_keeper': role = 'Quản lý kho'; break;
    }

    content.short = content.short.replace(`{user_role}`, role);
    content.short = content.short.replace(`{user_role_name}`, sender_name);
  } else {
    if (content.short.includes(`{${sender_role}_name}`)) {
      content.short = content.short.replace(`{${sender_role}_name}`, sender_name);
    }
  }
  return content.short
}

export const exportNotiElementLink = (data, userInfo) => {
  var user_type= userInfo.user_type;
  var request_id = data.request_id;
  if (user_type === 'donor') {
    return `/donor/request/${request_id}`;
  } else if (user_type === 'donee') {
    return `/request/${request_id}`;
  } else if (user_type === 'director') {
    return `/director/request/${data.request_from}/${request_id}`;
  } else {
    return `/director/request/${data.request_from}/${request_id}`;
  }
}