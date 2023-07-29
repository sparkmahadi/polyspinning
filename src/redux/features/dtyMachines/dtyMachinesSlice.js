import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDtyMachine, fetchDtyMachineDetails, fetchDtyMachines, fetchDtyMachinesBySearch, modifyDtyMachine, modifyOtherMC } from "./apiCalls/dtyFloorStatusAPI";

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
    detailedMCForCompare: {},
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

export const getDtyMCDetailForComparison = createAsyncThunk("dtyMachines/getDtyMCDetailForComparison", async (machineWithSide) => {
    const machineData = fetchDtyMachineDetails(machineWithSide);
    return machineData;
})

export const getDtyMachinesBySearch = createAsyncThunk("dtyMachines/getDtyMachineBySearch", async (searchData) => {
    const machines = fetchDtyMachinesBySearch(searchData);
    return machines;
})

export const updateDtyMachine = createAsyncThunk("dtyMachines/updateDtyMachine", async (updateInfo, thunkAPI) => {
    const machineData = modifyDtyMachine(updateInfo.DTYMCNo, updateInfo.Side, updateInfo.updatedMCDetail);
    thunkAPI.dispatch(getDtyMachines);
    return machineData;
})

export const updateOtherMC = createAsyncThunk("dtyMachines/updateOtherMC", async (updateInfo, thunkAPI) => {
    // console.log("updateInfo", updateInfo);
    const machineData = modifyOtherMC(updateInfo.DTYMCNo, updateInfo.Side, updateInfo.UpdatesFrom, updateInfo.Props);
    thunkAPI.dispatch(getDtyMachines);
    return machineData;
})

export const removeDtyMachine = createAsyncThunk("dtyMachines/removeDtyMachine", async (id, thunkAPI) => {
    const machineData = deleteDtyMachine(id);
    thunkAPI.dispatch(getDtyMachines());
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
            state.detailedMachine = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(getDtyMCDetailForComparison.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getDtyMCDetailForComparison.fulfilled, (state, action) => {
            state.detailedMCForCompare = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getDtyMCDetailForComparison.rejected, (state, action) => {
            state.detailedMCForCompare = {};
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