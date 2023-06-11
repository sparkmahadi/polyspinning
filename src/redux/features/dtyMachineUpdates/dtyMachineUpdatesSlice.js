import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postMachineUpdate } from "./apiCalls/dtyMachineUpdateAPI";

const initialState = {
    dtyMachineUpdates: [],
    postMachineUpdate: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const addMachineUpdates = createAsyncThunk("dtyMachinesFromLot/addMachineUpdates", async(updateInfo)=>{
    const machineData = postMachineUpdate(updateInfo.machineData, updateInfo.changedProps);
    return machineData;
})

const dtyMachineUpdatesSlice = createSlice({
    initialState,
    name: "dtyMachineUpdates",
    reducers:{},
    extraReducers:{

    }
})

export default dtyMachineUpdatesSlice.reducer;