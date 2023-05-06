import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';
const initialState = {
    newProducts: {},
    amootProducts: {},
    categoryProducts: {},
    searchingProducts: {},
    donorProducts: {},
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
        setDonorProducts: (state, action) => {
            state.donorProducts = action.payload
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
    setNewProducts, setAmootProducts, setSearchingProducts, 
    setCategoryProducts, setCurrentProduct, setDonorProducts,
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
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
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
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
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
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
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
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
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
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveDonorProducts = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve donor's products")
            await axiosInstance.get(`/product`, {params: {
                donor_email: data.email,
                limit: data.limit,
                offset: data.offset
            }}).then((res) => {
                dispatch(setDonorProducts(res.data))
            })
            .catch((err) => {
                console.log(err.response.data)
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const postNewProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("post new product")
            await axiosInstance.post(`/product`, {
                donor_email: user.userInfo.email,
                token: user.userToken,
                name: data.name,
                description: data.description,
                price: data.price,
                unit: data.unit,
                expired_time: data.expired_time,
                stock: data.stock,
                category_id: parseInt(data.category_id),
                images: data.images,
                available_start: data.available_start + ':00',
                available_end: data.available_end + ':00'
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(setModalMessage("Create new product successfully!"))
                dispatch(showModal())
            }).catch((err) => {
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

export const deleteProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve donor's products")
            await axiosInstance.delete(`/product`, {data: {
                donor_email: user.userInfo.email,
                token: user.userToken,
                id: data.id
            }}).then((res) => {
                dispatch(setModalMessage("Delete product successfully!"))
                dispatch(showModal())
            })
            .catch((err) => {
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