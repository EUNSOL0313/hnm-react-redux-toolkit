import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let initialState = {
   productList: [],
   selectedItem: null,
   isLoading: false,
   error: null,
}
export const fetchProducts = createAsyncThunk('product/fetchAll', async (searchQuery, thunkApi) => {
   try {
      let url = `https://my-json-server.typicode.com/EUNSOL0313/hnm-react-router-practice/products?q=${searchQuery}`
      let response = await fetch(url)
      return await response.json()
   } catch (error) {
      thunkApi.rejectWithValue(error.message)
   }
})
export const fetchProductDetail = createAsyncThunk('product/fetchDetail', async (id, thunkApi) => {
   try {
      let url = `https://my-json-server.typicode.com/EUNSOL0313/hnm-react-router-practice/products/${id}`
      let response = await fetch(url)
      return await response.json()
   } catch (error) {
      thunkApi.rejectWithValue(error.message)
   }
})

//최신 리덕스 사용 -redux toolkit
export const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
         .addCase(fetchProductDetail.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.selectedItem = action.payload
         })
         .addCase(fetchProductDetail.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
         })
   },
})
console.log('slice', productSlice)

export const productActions = productSlice.actions
export default productSlice.reducer
