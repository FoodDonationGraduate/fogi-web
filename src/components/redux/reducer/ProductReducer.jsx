import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal, setModalType } from './ModalReducer';
const initialState = {
    newProducts: {},
    amootProducts: {},
    categoryProducts: {},
    searchingProducts: {},
    donorProducts: {},
    volunteerProducts: {},
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
        setVolunteerProducts : (state, action) => {
            state.volunteerProducts = action.payload
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
    setVolunteerProducts, setTypeOfSort
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
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
                dispatch(setNewProducts({}))
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
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
                dispatch(setAmootProducts({}))
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
            console.log("search product with query param: " + data.query)
            await axiosInstance.post(`/search/product/parent`, {
                query: data.query,
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field
            }).then((res) => {
                dispatch(setSearchingProducts(res.data))
            })
            .catch((err) => {
                console.log(err.response.data)
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
                dispatch(setSearchingProducts({}))
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
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
                dispatch(setCategoryProducts({}))
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
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
                dispatch(setCurrentProduct({}))
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveDonorProducts = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve donor's products")
            await axiosInstance.get(`/product/donor`, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                limit: data.limit ? data.limit : 6,
                offset: data.offset ? data.offset : 0
            }}).then((res) => {
                dispatch(setDonorProducts(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    dispatch(setDonorProducts({}))
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

export const postNewProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("post new product")
            await axiosInstance.post(`/product/donor`, {
                email: user.userInfo.email,
                token: user.userToken,
                name: data.name,
                description: data.description,
                unit: data.unit,
                expired_time: data.expired_time,
                stock: data.stock,
                images: data.images
            }).then((res) => {
                dispatch(setModalMessage("Tạo thực phẩm thành công!"))
                dispatch(showModal())
                dispatch(retrieveDonorProducts({}, user, navigate))
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Tạo thực phẩm không thành công!"))
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

export const deleteProduct = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("delete donor's products")
            await axiosInstance.delete(`/product/donor`, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                id: data.id
            }}).then((res) => {
                dispatch(setModalMessage("Xóa thực phẩm thành công"))
                dispatch(showModal())
                dispatch(retrieveDonorProducts({}, user, navigate))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setModalMessage("Xóa thực phẩm không thành công!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}


export const retrieveVolunteerProducts = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve volunteer's products")
            await axiosInstance.get(`/product`, {params: {
                volunteer_username: data.username,
                limit: data.limit ? data.limit : 6,
                offset: data.offset ? data.offset : 0
            }}).then((res) => {
                dispatch(setVolunteerProducts(res.data))
            })
            .catch((err) => {
                dispatch(setVolunteerProducts({}))
                console.log(err)
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
                dispatch(setModalType('danger'));
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}