import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allProducts: {},
    volunteerInfo: localStorage.getItem("volunteerInfo") !== "undefined" 
    && localStorage.getItem("volunteerInfo") !== null 
    ? JSON.parse(localStorage.getItem("volunteerInfo")) : {},
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        setVolunteerInfo: (state, action) => {
            state.volunteerInfo = action.payload
            localStorage.setItem('volunteerInfo', JSON.stringify(action.payload))
        },
    }
})

export const { 
    setAllProducts, setVolunteerInfo
} = cartReducer.actions

export default cartReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------
export const retrieveAllProducts = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all products in cart")
            data = Object.keys(data).length === 0 ? {limit: 4, offset: 0} : data
            await axiosInstance.get(`/cart`, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                limit: data.limit,
                offset: data.offset
            }}).then((res) => {
                dispatch(setAllProducts(res.data))
                dispatch(setVolunteerInfo(res.data.volunteer ? res.data.volunteer : {}))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
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

export const addNewProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("add new product to cart")
            await axiosInstance.post(`/cart`, {
                email: user.userInfo.email,
                token: user.userToken,
                product_id: data.product_id,
                quantity: data.quantity
            }).then((res) => {
                dispatch(retrieveAllProducts({}, user, navigate))
                dispatch(setModalMessage('Thêm thực phẩm thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 100) {
                    dispatch(setModalMessage('Không đủ số lượng tồn kho!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 101) {
                    dispatch(setModalMessage('Không tìm thấy thực phẩm này!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Thêm thực phẩm không thành công'))
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

export const updateProduct = (data, user, navigate) => {
    return async dispatch => {
        var result = false;
        try {
            console.log("update product in cart")
            await axiosInstance.patch(`/cart`, {
                email: user.userInfo.email,
                token: user.userToken,
                product_id: data.product_id,
                quantity: data.quantity
            }).then((res) => {
                result = true;
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else if (err.response.data.exit_code === 102) {
                    dispatch(setModalMessage('Không tìm thấy thực phẩm này!'))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Cập nhật thực phẩm không thành công'))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
        return result;
    }
}

export const deleteProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("delete product in cart")
            await axiosInstance.delete(`/cart`, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                product_id: data.product_id
            }}).then((res) => {
                dispatch(retrieveAllProducts({}, user, navigate))
                dispatch(setModalMessage('Xóa thực phẩm thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                    dispatch(setModalMessage('Xóa thực phẩm không thành công'))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}