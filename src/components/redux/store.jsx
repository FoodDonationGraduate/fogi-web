import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
import modalReducer from './reducer/ModalReducer.jsx'
import productReducer from './reducer/ProductReducer.jsx'
import categoryReducer from './reducer/CategoryReducer.jsx'
import donorReducer from './reducer/DonorReducer.jsx'
import cartReducer from './reducer/CartReducer.jsx'
import directorReducer from './reducer/DirectorReducer.jsx'
import dashboardReducer from './reducer/DashboardReducer.jsx'
import requestReducer from './reducer/RequestReducer.jsx'
import addressReducer from './reducer/AddressReducer.jsx'
import notificationReducer from './reducer/NotificationReducer.jsx'
import newsReducer from './reducer/NewsReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer,
        modalReducer,
        productReducer,
        categoryReducer,
        donorReducer,
        cartReducer,
        directorReducer,
        dashboardReducer,
        requestReducer,
        addressReducer,
        notificationReducer,
        newsReducer
    },
})
export default store