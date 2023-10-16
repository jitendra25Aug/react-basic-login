import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false,
    isSignupModalOpen: false,
    isSidebarOpen: false,
}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openLoginModal(state){
            state.isLoginModalOpen = true;
        },
        openSignupModal(state){
            state.isSignupModalOpen = true;
        },
        closeModal(state){
            state.isLoginModalOpen = false;
            state.isSignupModalOpen = false;
        },
        openSidebar(state){
            state.isSidebarOpen = true;
        },
        closeSidebar(state){
            state.isSidebarOpen = false;
        }
    }
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;