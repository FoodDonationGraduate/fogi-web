import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";

const initialState = {
    newProducts: {},
    amootProducts: {},
    categoryProducts: {},
    searchingProducts: {},
    currentProduct: {},
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
        setCategoryProducts: (state, action) => {
            state.categoryProducts = action.payload
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload
        },
        setTypeOfSort: (state, action) => {
            state.sort = action.payload
        }
    }
})

export const { 
    setNewProducts, setAmootProducts, setSearchingProducts, setCategoryProducts, setCurrentProduct,
    setTypeOfSort
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
            navigate('/')
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
                offset: data.offset,
                sort_field: data.sort_field
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

export const retrieveCategoryProducts = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve category products")
            await axiosInstance.get(`/product`, {params: {
                category_name: data.name,
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field
            }}).then((res) => {
                dispatch(setCategoryProducts(res.data))
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

export const retrieveCurrentProduct = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve product with id:" + data.id)
            await axiosInstance.get(`/product`, {params: {
                id: data.id
            }}).then((res) => {
                dispatch(setCurrentProduct(res.data))
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