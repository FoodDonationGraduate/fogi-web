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

export const retrieveAllProducts = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all products in cart")
            await axiosInstance.get(`/cart`, {params: {
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(setAllProducts(res.data))
            })
            .catch((err) => {
                handleExpiredToken(err.response.data, dispatch, navigate)
                console.log(err)
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
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
            await axiosInstance.get(`/cart`, {
                email: user.userInfo.email,
                token: user.userToken,
                product_id: data.product_id,
                quantity: data.quantity
            }).then((res) => {
                dispatch(setAllProducts(res.data))
            })
            .catch((err) => {
                handleExpiredToken(err.response.data, dispatch, navigate)
                console.log(err)
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}
