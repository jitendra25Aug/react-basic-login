import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    filtered_products: [],
    sort_value: 'asc',
    isLoading: true,
    isError: false,
    currentProductId: null,
    isViewOnly: true
}
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
           state.products = [...action.payload];
           state.filtered_products = [...action.payload];
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        },
        setError(state, action){
            state.isError = action.payload;
        },
        setCurrentProductId(state, action){
            state.currentProductId = action.payload;
        },
        setIsViewOnly(state, action){
            state.isViewOnly = action.payload;
        },
        updateProduct(state, action){
            const productId = action.payload.id;
            const productData = action.payload.data;
            const productIndex = state.products.findIndex((item)=>item.id === productId);
            state.products[productIndex] = {...productData};
            state.filtered_products[productIndex] = {...productData};
        },
        deleteProduct(state, action){
            const productId = action.payload.id;
            state.products = state.products.filter((item)=>item.id !== productId);
            state.filtered_products = state.products.filter((item)=>item.id !== productId);
        },
        filterProducts(state, action){
            const filterValue = action.payload.value;
            const filterName = action.payload.filterName;
            if(filterName === "search"){
                state.filtered_products = state.products.filter((item)=>item.title.toLowerCase().includes(filterValue.toLowerCase()));
            }else if(filterName === "all"){
                state.filtered_products = state.products;
            }else{
                state.filtered_products = state.products.filter((item)=>item.category === filterValue);
            }
        },
        sortProduct(state, action){
            state.sort_value = action.payload;
        }
    }
});

export const productsSliceActions = productsSlice.actions;
export default productsSlice;