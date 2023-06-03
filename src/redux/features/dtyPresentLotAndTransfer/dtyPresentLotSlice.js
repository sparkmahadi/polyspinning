import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLotData } from "./apiCalls/dtyPresentLotAPI";

const initialState = {
    presentLotData: {},
    isLoading: false,
    isError: false,
    error: '',
};

export const getLotData = createAsyncThunk("dtyPresentLotAndTransfer/getLotData", async () => {
    const lotData = fetchLotData();
    return lotData;
})

const dtyPresentLotSlice = createSlice({
    name: "dtyPresentLotAndTransfer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLotData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getLotData.fulfilled, (state, action) => {
            state.presentLotData = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getLotData.rejected, (state, action) => {
            state.presentLotData = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})


export default dtyPresentLotSlice.reducer;