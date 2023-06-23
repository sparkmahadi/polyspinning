import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import DtyFloorLayout from "../pages/FloorLayout/DTY/DtyFloorLayout";
import InputExcelData from "../pages/InputExcelData/InputExcelData";
import DtyMachinesFromPresentLot from "../pages/FloorLayout/DTY/DtyMachinesFromPresentLot";
import Login from "../pages/Logging/Login/Login";
import Register from './../pages/Logging/Register/Register';
import ResetPassword from "../pages/Logging/ResetPassword/ResetPassword";
import DtyProcessParams from "../pages/DTYProcessParameters/DtyProcessParams";
import DtyMachinesWithParams from "../pages/FloorLayout/DTY/DtyMachinesWithParams";
import DtyPresentLotAndTransfer from "../pages/FloorLayout/DTY/DtyPresentLotAndTransfer";
import PoyPresentLotAndTransfer from './../pages/FloorLayout/POY/PoyPresentLotAndTransfer';
import PoyWinder from "../pages/FloorLayout/POY/PoyWinder";
import AddNewDtyMachine from "../pages/Machines/DTY/AddNewDtyMachine";
import DTYMCDetails from "../pages/Machines/DTY/DTYMCDetails";
import DTYMachines from './../pages/FloorLayout/DTY/DTYMachines';
import AddNewParamStatic from "../pages/DTYProcessParameters/AddNewParamStatic";
import DTYPresentLotHistory from "../pages/DTYPresentLotHistory/DTYPresentLotHistory";
import DTYLotDetails from "../pages/DTYLotDetails/DTYLotDetails";
import DTYMachineUpdates from "../pages/FloorLayout/DTY/DTYMachineUpdates";
import DenierwisePOYLines from "../pages/FloorLayout/POY/DenierwisePOYLines";
import CheckingRoute from "./CheckingRoute";
import PrivateRoute from "./PrivateRoute";
import PoyFloorLayout from "../pages/FloorLayout/POY/PoyFloorLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/dty-floor-status",
                element: <DtyFloorLayout />
            },
            {
                path: "/dty-floor-status/dty-machines",
                element: <DTYMachines />
            },
            {
                path: "/dty-floor-status/dty-machines-from-present-lot",
                element: <DtyMachinesFromPresentLot />
            },
            {
                path: "/dty-floor-status/dty-machines/machine-details",
                element: <DTYMCDetails />,
            },
            {
                path: "/dty-floor-status/dty-machines-with-parameters",
                element: <CheckingRoute><DtyMachinesWithParams /></CheckingRoute>,
            },
            {
                path: "/dty-floor-status/dty-machine/new-machine",
                element: <CheckingRoute><AddNewDtyMachine /></CheckingRoute>
            },
            {
                path: "/dty-floor-status/present-lot-and-transfer-area",
                element: <DtyPresentLotAndTransfer />
            },
            {
                path: "/dty-floor-status/present-lot-and-transfer-area/history",
                element: <DTYPresentLotHistory />
            },
            {
                path: "/dty-floor-status/present-lot-and-transfer-area/history/:id",
                element: <DTYLotDetails />
            },
            {
                path: "/dty-floor-status/dty-machine-updates",
                element: <DTYMachineUpdates />
            },
            {
                path: "/dty-process-parameters",
                element: <DtyProcessParams />
            },
            {
                path: "/dty-process-parameters/add-new-parameter",
                element: <CheckingRoute><AddNewParamStatic /></CheckingRoute>
            },
            {
                path: "/poy-floor-status",
                element: <PoyFloorLayout />
            },
            {
                path: "/poy-floor-status/present-lot-and-transfer-area",
                element: <PoyPresentLotAndTransfer />
            },
            {
                path: "/poy-floor-status/denierwise-poy-lines",
                element: <PrivateRoute><DenierwisePOYLines /></PrivateRoute>
            },
            {
                path: "/poy-winders/:WinderNo",
                element: <PoyWinder />
            },
            {
                path: "/upload/excel",
                element: <CheckingRoute><InputExcelData /></CheckingRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
        ]
    }
])