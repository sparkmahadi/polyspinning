import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchUsers } from "./apiCalls";

const initialState={
    users: [],
    postUserSuccess: false,
    updateUserSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
}

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const userData = fetchUsers();
    return userData;
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
   
    },
    extraReducers: (builder) =>{
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.users = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

// export const {  } = usersSlice.actions;
export default usersSlice.reducer;