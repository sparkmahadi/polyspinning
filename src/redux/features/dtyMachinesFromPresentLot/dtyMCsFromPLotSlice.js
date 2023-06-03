import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMachineDataFromLot } from "./apiCalls/dtyMCsFromPLotAPI";

const initialState = {
    machineDataFromLot: [],
    isLoading: false,
    isError: false,
    error: '',
};

export const getMachineDataFromLot = createAsyncThunk("dtyMachinesFromLot/getMachines", async () => {
    const machineData = fetchMachineDataFromLot();
    return machineData;
})

const dtyMCsFromPLotSlice = createSlice({
    name: "dtyMachinesFromLot",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMachineDataFromLot.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getMachineDataFromLot.fulfilled, (state, action) => {
            state.machineDataFromLot = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getMachineDataFromLot.rejected, (state, action) => {
            state.machineDataFromLot = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export default dtyMCsFromPLotSlice.reducer;