import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPoyMcDataFromLot, fetchPoyWinderData } from "./apiCalls/poyMCsFromPLotAPI";

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

// export const addMachine = createAsyncThunk("dtyMachinesFromLot/addMachine", async (newMCDetails) => {
//     const machineData = postMachine(newMCDetails);
//     return machineData;
// })

// export const updateMachine = createAsyncThunk("dtyMachinesFromLot/updateMachine", async (updateInfo) => {
//     const machineData = modifyMahcineData(updateInfo.machineData, updateInfo.changedProps);
//     return machineData;
// })

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

        // builder.addCase(addMachine.pending, (state, action) => {
        //     state.isPosting = true;
        //     state.isError = false;
        // })
        // builder.addCase(addMachine.fulfilled, (state, action) => {
        //     state.postMachineSuccess = true;
        //     state.isPosting = false;
        //     state.isLoading = false;
        //     state.isError = false;
        // })
        // builder.addCase(addMachine.rejected, (state, action) => {
        //     state.postMachineSuccess = false;
        //     state.isPosting = false;
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.error.message;
        // })


        // builder.addCase(updateMachine.pending, (state, action) => {
        //     state.isPosting = true;
        //     state.isError = false;
        // })
        // builder.addCase(updateMachine.fulfilled, (state, action) => {
        //     state.updateMachineSuccess = true;
        //     state.isPosting = false;
        //     state.isLoading = false;
        //     state.isError = false;
        // })
        // builder.addCase(updateMachine.rejected, (state, action) => {
        //     state.postMachineSuccess = false;
        //     state.isPosting = false;
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.error.message;
        // })
    }
});

export default poyMCsFromPLotSlice.reducer;