import { configureStore } from "@reduxjs/toolkit";
import dtyPresentLotSlice from "../features/dtyPresentLotAndTransfer/dtyPresentLotSlice";
import dtyMCsFromPLotSlice from "../features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice";
import inputExcelSlice from "../features/inputExcelFiles/inputExcelSlice";
import poyMCsFromPLotSlice from "../features/poyMachinesFromPresentLot/poyMCsFromPLotSlice";
import dtyParametersSlice from "../features/dtyProcessParameters/dtyParametersSlice";
import dtyMachinesSlice from "../features/dtyMachines/dtyMachinesSlice";
import dtyMachineUpdatesSlice from "../features/dtyMachineUpdates/dtyMachineUpdatesSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";

const store = configureStore({
    reducer: {
        dtyPresentLotAndTransfer: dtyPresentLotSlice,
        dtyMachinesFromLot: dtyMCsFromPLotSlice,
        dtyProcessParameters: dtyParametersSlice,
        dtyMachines : dtyMachinesSlice,
        dtyMachineUpdates: dtyMachineUpdatesSlice,
        poyMachinesFromLot: poyMCsFromPLotSlice,
        inputExcelFiles: inputExcelSlice,
        dashboard: dashboardSlice,
    }
});

export default store;