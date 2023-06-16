import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLotData, fetchLotDetailsById, fetchPresentLotHistory, postLotData } from "./apiCalls/dtyPresentLotAPI";

const initialState = {
    presentLotData: {},
    presentLotHistory: [],
    lotDetails: {},
    postSuccess: false,
    updateSuccess: false,
    isPosting: false,
    isLoading: false,
    isError: false,
    error: '',
};

export const getLotData = createAsyncThunk("dtyPresentLotAndTransfer/getLotData", async () => {
    const lotData = fetchLotData();
    return lotData;
})

export const addLotData = createAsyncThunk("dtyPresentLotAndTransfer/addLotData", async (data) => {
    const lotData = postLotData(data);
    return lotData;
})

export const getPresentLotHistory = createAsyncThunk("dtyPresentLotAndTransfer/getPresentLotHistory", async() =>{
    const lotHistory = fetchPresentLotHistory();
    return lotHistory
})

export const getLotDetailsById = createAsyncThunk("dtyPresentLotAndTransfer/getLotDetailsById", async(lotId) =>{
    const lotData = fetchLotDetailsById(lotId);
    return lotData
})

const dtyPresentLotSlice = createSlice({
    name: "dtyPresentLotAndTransfer",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
    },
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

        builder.addCase(addLotData.pending, (state, action) => {
            state.isPosting = true;
            state.isError = false;
        })
        builder.addCase(addLotData.fulfilled, (state, action) => {
            state.isPosting = false;
            state.isError = false;
        })
        builder.addCase(addLotData.rejected, (state, action) => {
            state.presentLotData = {};
            state.isPosting = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getPresentLotHistory.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getPresentLotHistory.fulfilled, (state, action) => {
            state.presentLotHistory = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getPresentLotHistory.rejected, (state, action) => {
            state.presentLotHistory = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getLotDetailsById.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getLotDetailsById.fulfilled, (state, action) => {
            state.lotDetails = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getLotDetailsById.rejected, (state, action) => {
            state.lotDetails = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export const { togglePostSuccess, toggleUpdateSuccess } = dtyPresentLotSlice.actions;
export default dtyPresentLotSlice.reducer;