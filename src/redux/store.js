import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/productSlice'
import authenticateReducer from './reducers/authenticateSlice'

const store = configureStore({
   reducer: { auth: authenticateReducer, product: productReducer },
})

export default store
