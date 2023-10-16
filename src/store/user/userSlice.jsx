import { createSlice } from "@reduxjs/toolkit";

export const getLocalStorage = () => {
    const userInfo = JSON.parse(localStorage.getItem('login_details') || '{"userName":"","email":"","password":""}');
    return userInfo;
}

const initialState = {
    userInfo: getLocalStorage(),
    isLoading: true,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLocalStorage(state, action) {
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem('login_details', JSON.stringify(state.userInfo));
        },
        removeUser(){
            localStorage.setItem('logout', JSON.stringify(true));
        }
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice;