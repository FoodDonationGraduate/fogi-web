import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
import modalReducer from './reducer/ModalReducer.jsx'
import productReducer from './reducer/ProductReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer,
        modalReducer,
        productReducer
    },
})
export default store