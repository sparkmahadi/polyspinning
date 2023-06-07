import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPoyMcDataFromLot, fetchPoyWinderData, modifyWinderData, postWinder } from "./apiCalls/poyMCsFromPLotAPI";

const initialState = {
    machineDataFromLot: [],
    poyWinderData: {},
    postMachineSuccess: false,
    updateMachineSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const getPoyMcDataFromLot = createAsyncThunk("poyMachinesFromLot/getMachines", async () => {
    const machineData = fetchPoyMcDataFromLot();
    return machineData;
})

export const getPoyWinderData = createAsyncThunk("poyMachinesFromLot/getWinder", async (WinderNo) => {
    const winderData = fetchPoyWinderData(WinderNo);
    return winderData;
})

export const addWinder = createAsyncThunk("poyMachinesFromLot/addWinder", async (winderDetails) => {
    const winderData = postWinder(winderDetails);
    return winderData;
})

export const updateWinder = createAsyncThunk("poyMachinesFromLot/updateWinder", async (updateInfo) => {
    console.log('thunk', updateInfo);
    const WinderData = modifyWinderData(updateInfo.WinderData, updateInfo.changedProps);
    return WinderData;
})

const poyMCsFromPLotSlice = createSlice({
    name: "poyMachinesFromLot",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPoyMcDataFromLot.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getPoyMcDataFromLot.fulfilled, (state, action) => {
            state.machineDataFromLot = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getPoyMcDataFromLot.rejected, (state, action) => {
            state.machineDataFromLot = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getPoyWinderData.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getPoyWinderData.fulfilled, (state, action) => {
            state.poyWinderData = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getPoyWinderData.rejected, (state, action) => {
            state.poyWinderData = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(addWinder.pending, (state, action) => {
            state.isPosting = true;
            state.isError = false;
        })
        builder.addCase(addWinder.fulfilled, (state, action) => {
            state.postMachineSuccess = true;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(addWinder.rejected, (state, action) => {
            state.postMachineSuccess = false;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })


        builder.addCase(updateWinder.pending, (state, action) => {
            state.isPosting = true;
            state.isError = false;
        })
        builder.addCase(updateWinder.fulfilled, (state, action) => {
            state.updateMachineSuccess = true;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(updateWinder.rejected, (state, action) => {
            state.postMachineSuccess = false;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export default poyMCsFromPLotSlice.reducer;