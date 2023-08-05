import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal ,setModalType } from './ModalReducer';

import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const initialState = {
  unverifiedUsers: {},
  manageUsers: {},
  reports: {},
  user_type: 'donee',

  allUsers: {},
  allDirectors: {},
  allKeepers: {},
  allVolunteers: {},

  allRequests: {},
  currentRequest: null,
  availableVolunteers: {},

  allUnsortedFood: {},
  allParentFood: {},
  currentParentFood: null,
  allFood: {},

  initialParentFood: {},

  currentUser: {},
  currentStats: {},
  currentChart: {},

  allNews: {}
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

    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllDirectors: (state, action) => {
      state.allDirectors = action.payload;
    },
    setAllKeepers: (state, action) => {
      state.allKeepers = action.payload;
    },
    setAllVolunteers: (state, action) => {
      state.allVolunteers = action.payload;
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
    },

    setInitialParentFood: (state, action) => {
      state.initialParentFood = action.payload;
    },

    setCurrrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrrentStats: (state, action) => {
      state.currentStats = action.payload;
    },
    setCurrrentChart: (state, action) => {
      state.currentChart = action.payload;
    },
  }
});

export const {
  setUnverifiedUsers, setManageUsers, setReports, setTypeOfUser,

  setAllUsers, setAllDirectors, setAllKeepers, setAllVolunteers,

  setAllRequests, setCurrentRequest, setAvailableVolunteers,

  setAllUnsortedFood, setAllParentFood, setCurrentParentFood, setAllFood,

  setInitialParentFood, setCurrrentUser, setCurrrentStats, setCurrrentChart
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
       dispatch(setUnverifiedUsers({}));
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
      await axiosInstance.get(`/director/user`, { params: currentData })
      .then((res) => {
        dispatch(setManageUsers(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setManageUsers({}));
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveAllUsers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve list of ${data.user_type}s`);
      let currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: data.user_type,
        limit: data.limit,
        offset: data.offset,
        name_query: data.name_query,
        email_query: data.email_query,
        sum_kg_filter: data.sum_kg_filter,
        sum_item_filter: data.sum_item_filter,
        being_reported_filter: data.being_reported_filter,
        account_status_filter: data.account_status_filter,
        sorts: data.sorts
      }
      if (data.num_take_request_filter) {currentData.num_take_request_filter = data.num_take_request_filter}
      if (data.num_give_request_filter) {currentData.num_give_request_filter = data.num_give_request_filter}
      if (data.setIsLoading) data.setIsLoading(true);

      await axiosInstance.get(`/${director.userInfo.user_type}/user`, { params: currentData })
      .then((res) => {
        if (data.user_type === 'director') dispatch(setAllDirectors(res.data));
        else if (data.user_type === 'warehouse_keeper') dispatch(setAllKeepers(res.data));
        else if (data.user_type === 'volunteer') dispatch(setAllVolunteers(res.data));
        else dispatch(setAllUsers(res.data));
        if (data.setIsLoading) data.setIsLoading(false);
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setAllUsers({}));
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
       dispatch(setReports({}));
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
    try {
      console.log(`${data.action} user`);
      await axiosInstance.patch(`/verify/info`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.user_email,
        action: data.action
      }).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        dispatch(setModalMessage(`${data.action === 'approve' ? 'Chấp thuận ' : 'Hạn chế '}người dùng thành công!"`));
        dispatch(showModal());
        dispatch(retrieveCurrentUser({user_email: data.user_email}, director, navigate));
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
        dispatch(setModalMessage(`${!data.isLock ? 'Mở k' : 'K'}hóa tài khoản thành công!`));
        dispatch(showModal());
        dispatch(retrieveCurrentUser({user_email: data.user_email}, director, navigate))
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

export const retrieveAllRequests = (data, director, navigate) => {
  return async dispatch => {
    try {
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        request_from: data.request_from,
        request_status: data.request_status,
        num_product_filter: data.num_product_filter,
        sum_kg_filter: data.sum_kg_filter,
        sum_item_filter: data.sum_item_filter,
        distance_filter: data.distance_filter,
        director_email: data.director_email,
        warehouse_keeper_email: data.warehouse_keeper_email,
        volunteer_email: data.volunteer_email,
        min_created_time: data.min_created_time,
        max_created_time: data.max_created_time,
        min_updated_time: data.min_updated_time,
        max_updated_time: data.max_updated_time,
        sorts: data.sorts
      }
      if (data.id_query !== '') {currentData.id_query = data.id_query}
      if (data.delivery_type !== '') {currentData.delivery_type = data.delivery_type}
      if (data.user_email && data.user_email !== '') {currentData.user_email = data.user_email}
      if (data.setIsLoading) data.setIsLoading(true);

      console.log('retrieve requests for director');
      await axiosInstance.get(`/request/${director.userInfo.user_type}`, { params: currentData })
      .then((res) => {
        dispatch(setAllRequests(res.data));
        if (data.setIsLoading) data.setIsLoading(false);
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setAllRequests({}));
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
      await axiosInstance.get(`/request/${director.userInfo.user_type}`, { params: {
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
          dispatch(setModalMessage("Yêu cầu không tồn tại!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setCurrentRequest(null));
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
      const body = {
        email: director.userInfo.email,
        token: director.userToken,
        request_status: data.request_status,
        request_id: data.request_id,
        request_from: data.request_from,
        volunteer_email: data.volunteer_email,
        cancel_reason: data.cancel_reason
      };
      if (data.volunteer_email) {body.volunteer_email=data.volunteer_email};
      await axiosInstance.patch(`/request/${director.userInfo.user_type}`, body).then((res) => {
        if (director.userInfo.user_type === 'director') {
          dispatch(retrieveCurrentRequest(data, director, navigate));
        } else {
          navigate('/warehouse_keeper/requests');
        }
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
    try {
      console.log('update request child list');
      await axiosInstance.post(`/request/director/child`, {
        email: director.userInfo.email,
        token: director.userToken,
        request_id: data.request_id,
        child_products: data.child_products
      }).then((res) => {
        dispatch(setModalMessage(`Cập nhật Thực phẩm con Yêu cầu ${data.request_id} thành công`));
        dispatch(showModal());
        if (data.request.delivery_type && data.request.delivery_type === 'pickup') {
          data.onUpdate();
        }
        data.setIsDistributed(true);
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

export const cancelRequest = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('cancel request');
      await axiosInstance.patch(`/request/${director.userInfo.user_type}`, {
        email: director.userInfo.email,
        token: director.userToken,
        request_status: 'canceled',
        request_id: data.request_id,
        request_from: data.request_from,
        cancel_reason: data.cancel_reason
      }).then((res) => {
        dispatch(setModalMessage(`Hủy Yêu cầu ${data.request_id} thành công`));
        dispatch(showModal());
        dispatch(retrieveCurrentRequest(data, director, navigate));
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
        offset: data.offset,
        request_from: data.request_from,
        request_id: data.request_id
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
       dispatch(setAvailableVolunteers({}));
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
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        sort_field: data.sort_field,
        sort_by: data.sort_by,
        filter: 'in_stock',
      }
      if (data.search_query !== '') { currentData.search_query = data.search_query }
      if (data.setIsLoading) data.setIsLoading(true);

      console.log('retrieve unsorted food');
      await axiosInstance.get(`/child/product/director`, { params: currentData })
      .then((res) => {
        dispatch(setAllUnsortedFood(res.data));
        if (data.setIsLoading) data.setIsLoading(false);
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setAllUnsortedFood({}));
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
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        category_ids: data.category_ids,
        stock_filter: data.stock_filter,
        unit: data.unit,
        min_created_time: data.min_created_time,
        max_created_time: data.max_created_time,
        min_updated_time: data.min_updated_time,
        max_updated_time: data.max_updated_time,
        sorts: data.sorts
      }
      if (data.search_query !== '') { currentData.search_query = data.search_query }
      if (data.setIsLoading) data.setIsLoading(true);

      console.log('retrieve parent food');
      await axiosInstance.get(`/parent/product/director`, { params: currentData })
      .then((res) => {
        dispatch(setAllParentFood(res.data));
        if (data.setIsLoading) data.setIsLoading(false);
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setAllParentFood({}));
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveCurrentParentFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        parent_id: data.parent_id
      }

      console.log('retrieve current parent food');
      await axiosInstance.get(`/parent/product/director`, { params: currentData })
      .then((res) => {
        dispatch(setCurrentParentFood(res.data.parent_product));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setCurrentParentFood({}));
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
      axiosInstance.post(`/parent/product/${director.userInfo.user_type}`, {
        email: director.userInfo.email,
        token: director.userToken,
        name: data.name,
        description: data.description,
        unit: data.unit,
        category_id: data.category_id,
        images: [data.image]
      }).then((res) => {
        dispatch(retrieveAllParentFood(data, director, navigate));
        dispatch(setModalMessage("Thêm Hạng mục con thành công!"));
        dispatch(showModal());
        if (!data.foodModal) {
          navigate(`/${director.userInfo.user_type}/category/${data.category_id}`);
        }
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Thêm Hạng mục con không thành công!"))
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
      axiosInstance.patch(`/parent/product/${director.userInfo.user_type}`, {
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
        dispatch(setModalMessage("Cập nhật Hạng mục con thành công!"));
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
          dispatch(setModalMessage("Cập nhật Hạng mục con không thành công!"))
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
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        limit: data.limit,
        offset: data.offset,
        sort_field: data.sort_field,
        sort_by: data.sort_by,
        filter: 'in_stock',
        parent_id: data.parent_id
      }
      if (data.search_query !== '') { currentData.search_query = data.search_query }
      if (data.setIsLoading) data.setIsLoading(true);

      console.log('retrieve food');
      await axiosInstance.get(`/child/product/director`, { params: currentData})
      .then((res) => {
        dispatch(setAllFood(res.data));
        if (data.setIsLoading) data.setIsLoading(false);
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setAllFood({}));
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
      await axiosInstance.post(`/child/product/${director.userInfo.user_type}`, { 
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
        dispatch(setModalMessage("Phân phối thực phẩm thành công!"))
        dispatch(showModal())
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

export const retrieveInitialParentFood = (data, director, navigate) => {
  return async dispatch => {
    try {
      var currentData = {
        email: director.userInfo.email,
        token: director.userToken,
        request_id: data.request_id
      }

      console.log('retrieve initial parent food');
      await axiosInstance.get(`/request/director/child`, { params: currentData})
      .then((res) => {
        dispatch(setInitialParentFood(res.data));

        const parentList = res.data.request_parent_list;
        let resultChildList = [];
        parentList.forEach((parent, idx) => {
          parent.foodList.forEach((child, idx) => {
            resultChildList = [...resultChildList, {
              child_id: child.content.id,
              parent_id: parent.id,
              quantity: child.quantity
            }]
          });
        });
        data.setSubCategoryList(res.data.request_parent_list);
        data.setChildList({ children: resultChildList });
        data.setOldChildList({ children: resultChildList });
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

export const retrieveCurrentUser = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve user with email ${data.user_email}`);
      await axiosInstance.get(`/director/user`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.user_email
      }}).then((res) => {
        dispatch(setCurrrentUser(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setCurrrentUser({}));
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveCurrentStats = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve user's stats with email ${data.user_email}`);
      await axiosInstance.get(`/director/user/stats`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.user_email,
        stats_type: data.stats_type
      }}).then((res) => {
        dispatch(setCurrrentStats(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setCurrrentStats({}));
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const retrieveCurrentChart = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log(`retrieve user's chart with email ${data.user_email}`);
      const currentParams = {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.user_email,
        chart_type: data.chart_type,
        time_type: data.time_type
      };
      if (data.chart_type === 'food') {currentParams.unit = data.unit}
      await axiosInstance.get(`/director/user/chart`, { params: currentParams}).then((res) => {
        dispatch(setCurrrentChart(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
       dispatch(setCurrrentChart({}));
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}