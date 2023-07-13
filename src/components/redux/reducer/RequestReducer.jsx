import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';
import { retrieveDonorProducts } from './ProductReducer';
import { retrieveAllProducts } from './CartReducer';

const initialState = {
    allRequests: {},
    currentRequest: {},
    sort: ''
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setAllRequests: (state, action) => {
            state.allRequests = action.payload
        },
        setCurrentRequest: (state, action) => {
            state.currentRequest = action.payload
        },
        setTypeOfSort: (state, action) => {
            state.sort = action.payload
        },
    }
})

export const { 
    setAllRequests, setCurrentRequest, setTypeOfSort
} = cartReducer.actions

export default cartReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------
export const retrieveAllRequests = (data, user, navigate) => {
    return async dispatch => {
        try {
            var currentData = {
                email: user.userInfo.email,
                token: user.userToken,
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field,
                sort_by: data.sort_by,
                request_status: data.request_status,
                search_query: data.search_query
            }
            if (data.search_query !== '') {currentData.search_query = data.search_query}
            if (data.delivery_type !== '') {currentData.delivery_type = data.delivery_type}

            console.log("retrieve all requests")
            data = Object.keys(data).length === 0 ? {limit: 4, offset: 0, sort_field: 'created_time'} : data
            await axiosInstance.get(`/request/`+user.userInfo.user_type, {params: currentData}).then((res) => {
                dispatch(setAllRequests(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    dispatch(setAllRequests({}))
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Đã xảy ra lỗi'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve one request")
            await axiosInstance.get(`/request/`+user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                request_id: data.request_id
            }}).then((res) => {
                dispatch(setCurrentRequest(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    dispatch(setCurrentRequest({}))
                } else if (err.response.data.exit_code === 201) {
                    dispatch(setModalMessage('Không tìm thấy yêu cầu này!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Đã xảy ra lỗi'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const postDonorRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("post donor's request")
            await axiosInstance.post(`/request/donor`, {
                email: user.userInfo.email,
                token: user.userToken,
                address: data.address,
                lat: data.lat,
                long: data.long,
                available_date: data.available_date,
                available_start: data.available_start,
                available_end: data.available_end
            }).then((res) => {
                dispatch(setModalMessage('Tạo yêu cầu mới thành công!'))
                dispatch(showModal())
                dispatch(retrieveDonorProducts({}, user, navigate))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 202) {
                    dispatch(setModalMessage('Túi cho của bạn đang trống. Vui lòng thêm thực phẩm trước khi tạo yêu cầu!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 206) {
                    dispatch(setModalMessage('Tài khoản bạn đang bị hạn chế. Bạn không thể tạo yêu cầu!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Tạo yêu cầu mới không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const postDoneeRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("post donee's request")
            let body = {
                reason: data.reason,
                delivery_type: data.delivery_type,
                available_date: data.available_date,
                available_start: data.available_start,
                available_end: data.available_end
            }
            if (data.delivery_type !== 'pickup') {
                body = {...body, ...{
                    address: data.address,
                    lat: data.lat,
                    long: data.long
                }}
            }
            await axiosInstance.post(`/request/donee`, {
                email: user.userInfo.email,
                token: user.userToken,
                ...body
            }).then((res) => {
                dispatch(setModalMessage('Tạo yêu cầu mới thành công'));
                dispatch(showModal());
                dispatch(retrieveAllProducts({}, user, navigate))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 202) {
                    dispatch(setModalMessage('Túi nhận của bạn đang trống. Vui lòng thêm thực phẩm trước khi tạo yêu cầu!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 206) {
                    dispatch(setModalMessage('Tài khoản bạn đang bị hạn chế. Bạn không thể tạo yêu cầu!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Tạo yêu cầu mới không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const updateRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update one request")
            await axiosInstance.patch(`/request/`+user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                request_id: data.request_id,
                request_status: data.request_status,
                cancel_reason: data.cancel_reason
            }).then((res) => {
                dispatch(setModalMessage((data.request_status === 'canceled' ? 'Hủy' : 'Cập nhật') + ' Yêu cầu thành công!'))
                dispatch(showModal())
                if (data.request_status === 'canceled') {
                    user.userInfo.user_type === 'donor' ? navigate('/donor/dashboard') : navigate('/requests');
                } else {
                    dispatch(retrieveRequest({ request_id: data.request_id }, user, navigate));
                }
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 201) {
                    dispatch(setModalMessage('Không tìm thấy yêu cầu này!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 203) {
                    dispatch(setModalMessage('Cập nhật trạng thái yêu cầu không hợp lệ!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Cập nhật yêu cầu không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const remakeDonorBag = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("remake donor's bag")
            await axiosInstance.post(`/request/donor/remake`, {
                email: user.userInfo.email,
                token: user.userToken,
                request_id: data.request_id
            }).then(() => {
                dispatch(setModalMessage('Vui lòng kiểm tra lại túi quyên góp!'));
                dispatch(showModal());
                dispatch(retrieveRequest({ request_id: data.request_id }, user, navigate));
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 204) {
                    dispatch(setModalMessage('Yêu cầu không hợp lệ, khôi phục túi cho không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Khôi phục túi cho không thành công'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const createReport = (data, volunteer, user, navigate) => {
    return async dispatch => {
        try {
            console.log('create report');
            await axiosInstance.post(`/report`, {
                email: user.userInfo.email,
                token: user.userToken,
                reportee_email: volunteer.email,
                request_id: data.request_id,
                reason: data.reason
            }).then((res) => {
                dispatch(setModalMessage('Đã gửi báo cáo thành công!'));
                dispatch(showModal());
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 700) {
                    dispatch(setModalMessage('Báo cáo không thành công'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 701) {
                    dispatch(setModalMessage('Yêu cầu không hợp lệ, báo cáo không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Báo cáo không thành công!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }
};