import { createSlice } from '@reduxjs/toolkit'
import axiosInstance, {ggApiInstance} from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allAdresses: {},
    currentAddress: {},
    selectedAddress: localStorage.getItem("selectedAddress") !== "undefined" 
        && localStorage.getItem("selectedAddress") !== null 
        ? JSON.parse(localStorage.getItem("selectedAddress"))
        : {
            address: '227 Nguyễn Văn Cừ, P. 4, Q. 5, TP. Hồ Chí Minh',
            lat: 10.762613,
            long: 106.681868
        }
}
const addressReducer = createSlice({
    name: "addressReducer",
    initialState,
    reducers: {
        setAllAddresses: (state, action) => {
            state.allAdresses = action.payload
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload
            localStorage.setItem('selectedAddress', JSON.stringify(state.selectedAddress))
        }
    }
})

export const { 
    setAllAddresses, setCurrentAddress, setSelectedAddress
} = addressReducer.actions

export default addressReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------
export const retrieveAllAddresses = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all addresses")
            await axiosInstance.get(`/address/` + user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(setAllAddresses(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    dispatch(setAllAddresses({}))
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
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

export const retrieveAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve address with id: " + data.id)
            await axiosInstance.get(`/address/` + user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                id: data.id
            }}).then((res) => {
                dispatch(setCurrentAddress(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    dispatch(setCurrentAddress({}))
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
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

export const addNewAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("add new address")
            await axiosInstance.post(`/address/` + user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                name: data.name,
                address: data.address,
                lat: data.lat,
                long: data.long
            }).then((res) => {
                data.setState(0);
                dispatch(retrieveAllAddresses(user, navigate))
                dispatch(setModalMessage('Thêm địa chỉ mới thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 103 || err.response.data.exit_code === 104) {
                    dispatch(setModalMessage('Tên địa chỉ đã tồn tại!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Thêm địa chỉ mới không thành công!"))
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

export const updateAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update address with id: " + data.id)
            await axiosInstance.patch(`/address/` + user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                id: data.id,
                name: data.name,
                address: data.address,
                lat: data.lat,
                long: data.long
            }).then((res) => {
                data.setState(0);
                dispatch(retrieveAllAddresses(user, navigate))
                dispatch(setModalMessage('Cập nhật địa chỉ thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Cập nhật địa chỉ không thành công!'))
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

export const findAddress = (data, user, navigate) => {
    return async dispatch => {
        var lnglat = {};
        try {
            console.log("find lat/lng with address: " + data.address)
            await ggApiInstance.get(`maps/api/geocode/json` , {params: {
                address: data.address,
                key: 'AIzaSyB0w2JiDGcjnMkVQzD_fOQF4ip0sFX9Bds'
            }}).then((res) => {
                lnglat = {
                    lat: res.data.results[0].geometry.location.lat,
                    lng: res.data.results[0].geometry.location.lng
                };
            })
            .catch((err) => {
                console.log(err)
                dispatch(setModalMessage('Không thể tìm thấy địa điểm này!'))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
        return lnglat;
    }
}