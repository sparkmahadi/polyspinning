import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDtyMachineDetails, fetchDtyMachines, fetchDtyMachinesBySearch, modifyDtyMachine, modifyOtherSideMC } from "./apiCalls/dtyFloorStatusAPI";

const initialState = {
    dtyMachines: [],
    selectedFilters: {
        floor: 'All',
        productType: 'All',
        poyLine: 'All',
        checkArea: 'All',
        bobbinColor: 'All',
        lotNo: 'All',
        intType: 'All',
        intJetType: 'All',
    },
    machineDisplayMode: "BigCard",
    searchedCategory: "notSelected",
    propsForSearch: [],
    searchedProp: "notSelected",
    detailedMachine: {},
    enableEditing: false,
    postMachineSuccess: false,
    updateMachineSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
};

export const getDtyMachines = createAsyncThunk("dtyMachines/getDtyMachines", async () => {
    const machineData = fetchDtyMachines();
    return machineData;
})

export const getDtyMachineDetails = createAsyncThunk("dtyMachines/getDtyMachineDetails", async (machineWithSide) => {
    const machineData = fetchDtyMachineDetails(machineWithSide);
    return machineData;
})

export const getDtyMachinesBySearch = createAsyncThunk("dtyMachines/getDtyMachineBySearch", async (searchData) => {
    const machines = fetchDtyMachinesBySearch(searchData);
    return machines;
})

export const updateDtyMachine = createAsyncThunk("dtyMachines/updateDtyMachine", async (updateInfo, thunkAPI) => {
    console.log("updateInfo", updateInfo);
    const machineData = modifyDtyMachine(updateInfo.DTYMCNo, updateInfo.Side, updateInfo.changedProperties);
    thunkAPI.dispatch(getDtyMachines);
    return machineData;
})

export const updateOtherSideMC = createAsyncThunk("dtyMachines/updateOtherSideMC", async (updateInfo, thunkAPI) => {
    // console.log("updateInfo", updateInfo);
    const machineData = modifyOtherSideMC(updateInfo.DTYMCNo, updateInfo.Side, updateInfo.Props);
    thunkAPI.dispatch(getDtyMachines);
    return machineData;
})

const dtyMachinesSlice = createSlice({
    name: "dtyMachines",
    initialState,
    reducers: {
        switchEnableEditing: (state, action) => {
            state.enableEditing = !state.enableEditing;
        },
        setSelectedFiltersDTY: (state, action) => {
            state.selectedFilters = action.payload;
        },
        setMachineDisplayMode: (state, action) => {
            state.machineDisplayMode = action.payload;
        },
        setSearchedValue: (state, action) => {
            state.isLoading = true;
            state[action.payload.name] = action.payload.value;
            state.isLoading = false;
        },
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

        builder.addCase(getDtyMachinesBySearch.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyMachinesBySearch.fulfilled, (state, action) => {
            state.dtyMachines = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyMachinesBySearch.rejected, (state, action) => {
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


        builder.addCase(updateDtyMachine.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.updateMachineSuccess = false;
        })
        builder.addCase(updateDtyMachine.fulfilled, (state, action) => {
            state.updateMachineSuccess = true;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(updateDtyMachine.rejected, (state, action) => {
            state.updateMachineSuccess = false;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const { switchEnableEditing, setSelectedFiltersDTY, setMachineDisplayMode, setSearchedValue } = dtyMachinesSlice.actions;
export default dtyMachinesSlice.reducer;