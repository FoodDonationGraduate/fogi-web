import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal ,setModalType } from './ModalReducer';

import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const initialState = {
  unverifiedUsers: {},
  manageUsers: {},
  reports: {},
  user_type: 'donee',

  allRequests: {},
  currentRequest: null,
  availableVolunteers: {},

  allUnsortedFood: {},
  allParentFood: {},
  currentParentFood: {},
  allFood: {}
};

const directorReducer = createSlice({
  name: 'directorReducer',
  initialState,
  reducers: {
    setUnverifiedUsers: (state, action) => {
      state.unverifiedUsers = action.payload;
    },
    setManageUsers: (state, action) => {
      state.manageUsers = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    setTypeOfUser: (state, action) => {
      state.user_type = action.payload;
    },

    setAllRequests: (state, action) => {
      state.allRequests = action.payload;
    },
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    setAvailableVolunteers: (state, action) => {
      state.availableVolunteers = action.payload;
    },

    setAllUnsortedFood: (state, action) => {
      state.allUnsortedFood = action.payload;
    },
    setAllParentFood: (state, action) => {
      state.allParentFood = action.payload;
    },
    setCurrentParentFood: (state, action) => {
      state.currentParentFood = action.payload;
    },
    setAllFood: (state, action) => {
      state.allFood = action.payload;
    }
  }
});

export const {
  setUnverifiedUsers, setManageUsers, setReports, setTypeOfUser,

  setAllRequests, setCurrentRequest, setAvailableVolunteers,

  setAllUnsortedFood, setAllParentFood, setCurrentParentFood, setAllFood
} = directorReducer.actions

export default directorReducer.reducer

export const retrieveUnverifiedUsers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve unverified ${data.user_type}`);
      await axiosInstance.get(`/verify/info`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: data.user_type,
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setUnverifiedUsers(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveManageUsers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve list of ${data.user_type}s to manage`);
      let currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: data.user_type,
        limit: data.limit,
        offset: data.offset
      }
      if (data.search_query !== '') {currentData.search_query = data.search_query}
      await axiosInstance.get(`/director/profile`, { params: currentData}).then((res) => {
        dispatch(setManageUsers(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveReports = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve reports`);
      await axiosInstance.get(`/report`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        reportee_email: data.reportee_email,
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setReports(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const verifyUser = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`${data.action} user`);
      await axiosInstance.patch(`/verify/info`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.email,
        action: data.action
      }).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        dispatch(setModalMessage("Xét duyệt người dùng thành công!"));
        dispatch(showModal());
        dispatch(retrieveUnverifiedUsers(data, director, navigate));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Xét duyệt người dùng không thành công!"));
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const approveUser = (data, director, navigate) => {
  return async dispatch => {
    var result = false;
    try {
      console.log(`${data.action} user`);
      await axiosInstance.patch(`/verify/info`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.email,
        action: data.action
      }).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        dispatch(setModalMessage(`${data.action === 'approve' ? 'Chấp thuận ' : 'Hạn chế '}người dùng thành công!"`));
        dispatch(showModal());
        result = true;
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage(`${data.action === 'approve' ? 'Chấp thuận ' : 'Hạn chế '}người dùng không thành công!"`));
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
    return result;
  }
}

export const lockUser = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('lock user');
      await axiosInstance.patch(`/director/lock`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.user_email,
        action: `${!data.isLock ? 'un' : ''}lock`
      }).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        data.setIsLocked(data.isLock)
        dispatch(setModalMessage(`${!data.isLock ? 'Mở k' : 'K'}hóa tài khoản thành công!`));
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage(`${!data.isLock ? 'Mở k' : 'K'}hóa tài khoản không thành công!`));
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const addCategory = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('add category');
      axiosInstance.post(`/category`, {
        email: director.userInfo.email,
        token: director.userToken,
        name: data.name,
        description: data.name,
        image: data.image
      }).then((res) => {
        dispatch(retrieveAllCategories(navigate));
        dispatch(setModalMessage("Thêm Phân loại thành công!"));
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Thêm phân loại không thành công!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAllRequests = (data, director, navigate) => {
  return async dispatch => {
    try {
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        sort_field: data.sort_field,
        sort_by: data.sort_by,
        request_from: data.request_from,
        request_status: data.request_status
      }
      if (data.search_query !== '') {currentData.search_query = data.search_query}
      if (data.delivery_type !== '') {currentData.delivery_type = data.delivery_type}

      console.log('retrieve requests for director');
      await axiosInstance.get(`/request/director`, { params: currentData}).then((res) => {
        dispatch(setAllRequests(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveCurrentRequest = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve current request for director');
      await axiosInstance.get(`/request/director`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        request_from: data.request_from,
        request_id: data.request_id
      }}).then((res) => {
        dispatch(setCurrentRequest(res.data.request));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const updateRequest = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('update request');
      await axiosInstance.patch(`/request/director`, {
        email: director.userInfo.email,
        token: director.userToken,
        request_status: data.request_status,
        request_id: data.request_id,
        request_from: data.request_from,
        volunteer_email: data.volunteer_email,
        cancel_reason: data.cancel_reason
      }).then((res) => {
        dispatch(retrieveCurrentRequest(data, director, navigate));
        dispatch(setModalMessage(`Cập nhật trạng thái Yêu cầu ${data.request_id} thành công`));
        dispatch(setModalType('default'))
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const updateRequestChild = (data, director, navigate) => {
  return async dispatch => {
    var result = false;
    try {
      console.log('update request child list');
      await axiosInstance.post(`/request/director/child`, {
        email: director.userInfo.email,
        token: director.userToken,
        request_id: data.request_id,
        child_products: data.child_products
      }).then((res) => {
        result = true;
        dispatch(setModalMessage(`Cập nhật Thực phẩm con Yêu cầu ${data.request_id} thành công`));
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
    return result;
  }
}

export const cancelRequest = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('cancel request');
      await axiosInstance.patch(`/request/director`, {
        email: director.userInfo.email,
        token: director.userToken,
        request_status: 'canceled',
        request_id: data.request_id,
        request_from: data.request_from,
        cancel_reason: data.cancel_reason
      }).then((res) => {
        dispatch(setCurrentRequest(null));
        dispatch(setModalMessage(`Hủy Yêu cầu ${data.request_id} thành công`));
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAvailableVolunteers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve available volunteers');
      await axiosInstance.get(`/director/volunteer`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setAvailableVolunteers(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAllUnsortedFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve unsorted food');
      await axiosInstance.get(`/child/product/director`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        sort_field: 'stock',
        sort_by: 'desc',
        filter: 'in_stock'
      }}).then((res) => {
        dispatch(setAllUnsortedFood(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAllParentFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve parent food');
      await axiosInstance.get(`/parent/product/director`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        category_id: data.category_id
      }}).then((res) => {
        dispatch(setAllParentFood(res.data));
        console.log(JSON.stringify(directorReducer))
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const addParentFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('add parent food');
      axiosInstance.post(`/parent/product/director`, {
        email: director.userInfo.email,
        token: director.userToken,
        name: data.name,
        description: data.description,
        unit: data.unit,
        category_id: data.category_id,
        images: [data.image]
      }).then((res) => {
        dispatch(retrieveAllParentFood(data, director, navigate));
        dispatch(setModalMessage("Thêm Thực phẩm Đại diện thành công!"));
        dispatch(showModal());
        if (!data.foodModal) {
          navigate(`/director/category/${data.category_id}`);
        }
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Thêm Thực phẩm Đại diện không thành công!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const updateParentFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('update parent food');
      axiosInstance.patch(`/parent/product/director`, {
        email: director.userInfo.email,
        token: director.userToken,
        name: data.name,
        description: data.description,
        unit: data.unit,
        id: data.id,
        category_id: data.category_id,
        images: [data.image]
      }).then((res) => {
        dispatch(retrieveAllParentFood(data, director, navigate));
        dispatch(setModalMessage("Cập nhật Thực phẩm Đại diện thành công!"));
        dispatch(showModal());
        data.setTargetSubCategory({
          ...data.targetSubCategory,
          name: data.name,
          description: data.description,
          unit: data.unit
        });
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Cập nhật Thực phẩm Đại diện không thành công!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAllFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve food');
      await axiosInstance.get(`/child/product/director`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        sort_field: 'stock',
        sort_by: 'desc',
        filter: 'in_stock',
        parent_id: data.parent_id,
      }}).then((res) => {
        dispatch(setAllFood(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const updateFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('update food');
      await axiosInstance.post(`/child/product/director`, { 
        email: director.userInfo.email,
        token: director.userToken,
        child_id: data.child_id,
        parent_id: data.parent_id,
        child_name: data.child_name,
        child_stock: data.child_stock,
        child_unit: data.child_unit
      }).then((res) => {
        if (!data.is_sorted) dispatch(retrieveAllUnsortedFood({
          ...data,
          offset: (data.food_list_length % data.offset !== 1) ? data.offset : 0
        }, director, navigate));
        else dispatch(retrieveAllFood({
          ...data,
          offset: (data.food_list_length % data.offset !== 1) ? data.offset : 0
        }, director, navigate));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}