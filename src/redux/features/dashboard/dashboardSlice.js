import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isSidebarOpen: false,
}

const dashboadSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        setSidebarOpen: (state, action) =>{
            state.isSidebarOpen = action.payload;
        }
    },
})

export const { setSidebarOpen } = dashboadSlice.actions;
export default dashboadSlice.reducer;