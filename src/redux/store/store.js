import { configureStore } from "@reduxjs/toolkit";
import dtyPresentLotSlice from "../features/dtyPresentLotAndTransfer/dtyPresentLotSlice";
import dtyMCsFromPLotSlice from "../features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice";
import inputExcelSlice from "../features/inputExcelFiles/inputExcelSlice";

const store = configureStore({
    reducer: {
        dtyPresentLotAndTransfer: dtyPresentLotSlice,
        dtyMachinesFromLot: dtyMCsFromPLotSlice,
        inputExcelFiles: inputExcelSlice,
    }
});

export default store;