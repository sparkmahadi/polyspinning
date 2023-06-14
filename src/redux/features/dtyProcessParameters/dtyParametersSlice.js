import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDtyParams, fetchDtyParamsByMC, fetchDtyParamsByMachines, fetchDtyParamsForComparison, modifyMainMachineParam, postDtyParameter } from "./apiCalls/dtyParametersAPI";

const initialState = {
    dtyProcessParameters: [],
    dtyParamsForComparison: [],
    dtyMachinesWithParams: [],
    dtyOneMachineWithParams: {},
    paramModalData: {},
    postParamSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const getDtyParams = createAsyncThunk("dtyProcessParameters/getDtyParams", async () => {
    const machineData = fetchDtyParams();
    return machineData;
})

export const getDtyParamsForComparison = createAsyncThunk("dtyProcessParameters/getDtyParamsForComparison", async () => {
    const machineData = fetchDtyParamsForComparison();
    return machineData;
})

export const getDtyParamByMC = createAsyncThunk("dtyProcessParameters/getDtyParamByMC", async (machineNo) => {
    const machineData = fetchDtyParamsByMC(machineNo);
    return machineData;
})

export const getDtyParamByMachines = createAsyncThunk("dtyProcessParameters/getDtyParamByMachines", async (machines) => {
    const machineData = fetchDtyParamsByMachines(machines);
    return machineData;
})

export const addDtyParameter = createAsyncThunk("dtyProcessParameters/addDtyParameter", async (paramDetails) => {
    const parameterData = postDtyParameter(paramDetails);
    return parameterData;
})

// export const updateMachine = createAsyncThunk("dtyMachinesFromLot/updateMachine", async (updateInfo) => {
//     const machineData = modifyMahcineData(updateInfo.machineData, updateInfo.changedProps);
//     return machineData;
// })

export const updateDtyMachineParam = createAsyncThunk("dtyProcessParameters/updateDtyMachineParam", async(newParameter)=>{
    const machineData = modifyMainMachineParam(newParameter);
    return machineData;
})

const dtyParametersSlice = createSlice({
    name: "dtyProcessParameters",
    initialState,
    reducers: {
        setParamModalData: (state, action) =>{
            state.paramModalData = action.payload;
        },
        clearParamModalData: (state, action) =>{
            state.paramModalData = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDtyParams.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyParams.fulfilled, (state, action) => {
            state.dtyProcessParameters = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyParams.rejected, (state, action) => {
            state.dtyProcessParameters = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getDtyParamsForComparison.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyParamsForComparison.fulfilled, (state, action) => {
            state.dtyParamsForComparison = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyParamsForComparison.rejected, (state, action) => {
            state.dtyParamsForComparison = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        
        
        builder.addCase(getDtyParamByMachines.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyParamByMachines.fulfilled, (state, action) => {
            state.dtyMachinesWithParams = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyParamByMachines.rejected, (state, action) => {
            state.dtyMachinesWithParams = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })


        builder.addCase(getDtyParamByMC.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyParamByMC.fulfilled, (state, action) => {
            state.dtyOneMachineWithParams = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyParamByMC.rejected, (state, action) => {
            state.dtyOneMachineWithParams = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const {setParamModalData, clearParamModalData} = dtyParametersSlice.actions;
export default dtyParametersSlice.reducer;