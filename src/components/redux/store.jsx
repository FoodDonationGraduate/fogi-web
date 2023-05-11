import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
import modalReducer from './reducer/ModalReducer.jsx'
import productReducer from './reducer/ProductReducer.jsx'
import categoryReducer from './reducer/CategoryReducer.jsx'
import donorReducer from './reducer/DonorReducer.jsx'
import cartReducer from './reducer/CartReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer,
        modalReducer,
        productReducer,
        categoryReducer,
        donorReducer,
        cartReducer
    },
})
export default store