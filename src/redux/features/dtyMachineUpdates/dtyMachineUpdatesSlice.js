import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDtyMachineUpdates, postDtyMachineUpdate } from "./apiCalls/dtyMachineUpdateAPI";

const initialState = {
    dtyMachineUpdates: [],
    postMachineUpdate: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const addDtyMachineUpdates = createAsyncThunk("dtyMachineUpdates/addMachineUpdates", async(updateInfo)=>{
    const machineData = postDtyMachineUpdate(updateInfo.machineData, updateInfo.changedProps);
    return machineData;
})

export const getDtyMachineUpdates = createAsyncThunk("dtyMachineUpdates/getMachineUpdates", async() =>{
    const machines = fetchDtyMachineUpdates();
    return machines;
})

const dtyMachineUpdatesSlice = createSlice({
    initialState,
    name: "dtyMachineUpdates",
    reducers:{},
    extraReducers:
        (builder) => {
            builder.addCase(getDtyMachineUpdates.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            builder.addCase(getDtyMachineUpdates.fulfilled, (state, action) => {
                state.dtyMachineUpdates = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            builder.addCase(getDtyMachineUpdates.rejected, (state, action) => {
                state.dtyMachineUpdates = {};
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            builder.addCase(addDtyMachineUpdates.pending, (state, action) => {
                state.postMachineUpdate = false;
                state.isPosting = true;
                state.isError = false;
            })
            builder.addCase(addDtyMachineUpdates.fulfilled, (state, action) => {
                state.postMachineUpdate = true;
                state.isPosting = false;
                state.isError = false;
            })
            builder.addCase(addDtyMachineUpdates.rejected, (state, action) => {
                state.postMachineUpdate = false;
                state.isPosting = false;
                state.isError = true;
                state.error = action.error.message;
            })
        }
})

export default dtyMachineUpdatesSlice.reducer;