import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './pages/productsSlice'

export default configureStore({
    reducer: {
        products: productsReducer
    },
})