import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    fileTypeInfo: "",
    excelData: [],
    isLoading: false,
    isError: false,
    error: '',
};

// export const getLotData = createAsyncThunk("inputExcelFile/getLotData", async () => {
//     const lotData = fetchLotData();
//     return lotData;
// })

const inputExcelSlice = createSlice({
    name: "inputExcelFile",
    initialState,
    reducers: {
        selectFileType: (state, action) => {
            state.fileTypeInfo = action.payload;
        },
        setExcelData: (state, action) => {
            state.excelData = action.payload;
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(getLotData.pending, (state, action) => {
        //     state.isLoading = true;
        //     state.isError = false;
        // })
        // builder.addCase(getLotData.fulfilled, (state, action) => {
        //     state.presentLotData = action.payload;
        //     state.isLoading = false;
        //     state.isError = false;
        // })
        // builder.addCase(getLotData.rejected, (state, action) => {
        //     state.presentLotData = {};
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.error = action.error.message;
        // })
    }
})

export const { selectFileType, setExcelData } = inputExcelSlice.actions;
export default inputExcelSlice.reducer;