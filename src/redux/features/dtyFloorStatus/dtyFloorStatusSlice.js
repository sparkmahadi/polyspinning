import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDtyMachineDetails, fetchDtyMachines } from "./apiCalls/dtyFloorStatusAPI";

const initialState = {
    dtyMachines: [],
    detailedMachine: {},
    postMachineSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const getDtyMachines = createAsyncThunk("dtyFloorStatus/getDtyMachines", async () => {
    const machineData = fetchDtyMachines();
    return machineData;
})

export const getDtyMachineDetails = createAsyncThunk("dtyFloorStatus/getDtyMachineDetails", async (machineWithSide) => {
    const machineData = fetchDtyMachineDetails(machineWithSide);
    return machineData;
})

const dtyFloorStatusSlice = createSlice({
    name: "dtyFloorStatus",
    initialState,
    reducers: {
        // setParamModalData: (state, action) =>{
        //     state.paramModalData = action.payload;
        // },
        // clearParamModalData: (state, action) =>{
        //     state.paramModalData = {};
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getDtyMachines.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyMachines.fulfilled, (state, action) => {
            state.dtyMachines = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyMachines.rejected, (state, action) => {
            state.dtyMachines = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })


        builder.addCase(getDtyMachineDetails.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyMachineDetails.fulfilled, (state, action) => {
            state.detailedMachine = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyMachineDetails.rejected, (state, action) => {
            state.detailedMachine = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

// export const {setParamModalData, clearParamModalData} = dtyFloorStatusSlice.actions;
export default dtyFloorStatusSlice.reducer;