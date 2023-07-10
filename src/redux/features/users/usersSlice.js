import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteUser, fetchUsers, updateUserVerification } from "./apiCalls";

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

export const verifyUser = createAsyncThunk("users/verifyUser", async (email, thunkAPI) => {
    const userData = updateUserVerification(email);
    // thunkAPI.dispatch(getUsers());
    return userData;
})

export const removeUser = createAsyncThunk("users/removeUser", async (id, thunkAPI) => {
    const userData = deleteUser(id);
    thunkAPI.dispatch(getUsers());
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

        builder.addCase(verifyUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            const oldUser = state.users.find(user => user.email === action.payload);
            const updatedUser = {...oldUser, verified: true};
            const newUsers = state.users.filter(user => user.email !== action.payload);
            newUsers.push(updatedUser);
            state.users = newUsers;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(verifyUser.rejected, (state, action) => {
            // state.users = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

// export const {  } = usersSlice.actions;
export default usersSlice.reducer;