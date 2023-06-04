import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allProducts: {}
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        }
    }
})

export const { 
    setAllProducts
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
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
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
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
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
        try {
            console.log("update product in cart")
            await axiosInstance.patch(`/cart`, {
                email: user.userInfo.email,
                token: user.userToken,
                product_id: data.product_id,
                quantity: data.quantity
            }).then((res) => {
                //dispatch(retrieveAllProducts({}, user, navigate))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
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
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}