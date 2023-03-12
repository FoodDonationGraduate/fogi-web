import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, cancelModal } from 'components/redux/reducer/ModalReducer';

const initialState = {
    newProducts: {},
    amootProducts: {},
    searchingProducts: {},
    searchingQuery: '',
    sort: ''
}
const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers: {
        setNewProducts: (state, action) => {
            state.newProducts = action.payload
        },
        setAmootProducts: (state, action) => {
            state.amootProducts = action.payload
        },
        setSearchingProducts: (state, action) => {
            state.searchingProducts = action.payload
        },
        setSearchinQuery: (state, action) => {
            state.searchingQuery = action.payload
        },
        setTypeOfSort: (state, action) => {
            state.sort = action.payload
        }
    }
})

export const { 
    setNewProducts, setAmootProducts, setSearchingProducts, 
    setSearchinQuery, setTypeOfSort
} = productReducer.actions

export default productReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveNewProducts = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve new products")
            await axiosInstance.get(`/product/new`, {params: {
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field
            }}).then((res) => {
                dispatch(setNewProducts(res.data))
            })
            .catch((err) => {
                console.log(err)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            // navigate('/')
        }
    }
}

export const retrieveAmootProducts = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve almost out of stock products")
            await axiosInstance.get(`/product/almost-out-of-stock`, {params: {
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field
            }}).then((res) => {
                dispatch(setAmootProducts(res.data))
            })
            .catch((err) => {
                console.log(err.response.data)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const searchProduct = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve almost out of stock products")
            await axiosInstance.post(`/search/product`, {
                name: data.name,
                limit: data.limit,
                offset: data.offset
            }).then((res) => {
                dispatch(setSearchingProducts(res.data))
            })
            .catch((err) => {
                console.log(err.response.data)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}