import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
import modalReducer from './reducer/ModalReducer.jsx'
import productReducer from './reducer/ProductReducer.jsx'
import categoryReducer from './reducer/CategoryReducer.jsx'
import donorReducer from './reducer/DonorReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer,
        modalReducer,
        productReducer,
        categoryReducer,
        donorReducer
    },
})
export default store