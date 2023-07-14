import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isSidebarOpen: false
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        setSidebarOpen: (state, action) =>{
            state.isSidebarOpen = action.payload;
        },
    },
})

export const { setSidebarOpen } = dashboardSlice.actions;
export default dashboardSlice.reducer;