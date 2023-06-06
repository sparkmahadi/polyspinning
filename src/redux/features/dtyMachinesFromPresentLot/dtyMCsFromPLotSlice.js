import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMcMergedeDataFromLot, fetchMceDataFromLot, modifyMahcineData, postMachine } from "./apiCalls/dtyMCsFromPLotAPI";

const initialState = {
    machineMergedDataFromLot: [],
    machineDataFromLot: [],
    postMachineSuccess: false,
    updateMachineSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const getMcMergedDataFromLot = createAsyncThunk("dtyMachinesFromLot/getMachinesMerged", async () => {
    const machineData = fetchMcMergedeDataFromLot();
    return machineData;
})

export const getMcDataFromLot = createAsyncThunk("dtyMachinesFromLot/getMachines", async () => {
    const machineData = fetchMceDataFromLot();
    return machineData;
})

export const addMachine = createAsyncThunk("dtyMachinesFromLot/addMachine", async (newMCDetails) => {
    const machineData = postMachine(newMCDetails);
    return machineData;
})

export const updateMachine = createAsyncThunk("dtyMachinesFromLot/updateMachine", async (updateInfo) => {
    const machineData = modifyMahcineData(updateInfo.machineData, updateInfo.changedProps);
    return machineData;
})

const dtyMCsFromPLotSlice = createSlice({
    name: "dtyMachinesFromLot",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMcMergedDataFromLot.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getMcMergedDataFromLot.fulfilled, (state, action) => {
            state.machineMergedDataFromLot = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getMcMergedDataFromLot.rejected, (state, action) => {
            state.machineMergedDataFromLot = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getMcDataFromLot.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getMcDataFromLot.fulfilled, (state, action) => {
            state.machineDataFromLot = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getMcDataFromLot.rejected, (state, action) => {
            state.machineDataFromLot = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(addMachine.pending, (state, action) => {
            state.isPosting = true;
            state.isError = false;
        })
        builder.addCase(addMachine.fulfilled, (state, action) => {
            state.postMachineSuccess = true;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(addMachine.rejected, (state, action) => {
            state.postMachineSuccess = false;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })


        builder.addCase(updateMachine.pending, (state, action) => {
            state.isPosting = true;
            state.isError = false;
        })
        builder.addCase(updateMachine.fulfilled, (state, action) => {
            state.updateMachineSuccess = true;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(updateMachine.rejected, (state, action) => {
            state.postMachineSuccess = false;
            state.isPosting = false;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export default dtyMCsFromPLotSlice.reducer;