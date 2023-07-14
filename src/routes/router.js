import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import InputExcelData from "../pages/InputExcelData/InputExcelData";
import Login from "../pages/Logging/Login/Login";
import Register from './../pages/Logging/Register/Register';
import ResetPassword from "../pages/Logging/ResetPassword/ResetPassword";
import CheckingRoute from "./CheckingRoute";
import PrivateRoute from "./PrivateRoute";
import FileUpFormats from "../pages/InputExcelData/FileUpFormats";
import DtyFloorLayout from "../pages/DTY/FloorLayout/DtyFloorLayout";
import DTYMachines from "../pages/DTY/FloorLayout/DTYMachines";
import DtyMachinesFromPresentLot from "../pages/DTY/FloorLayout/DtyMachinesFromPresentLot";
import DTYMCDetails from './../pages/DTY/Machines/DTYMCDetails';
import DtyMachinesWithParams from './../pages/DTY/FloorLayout/DtyMachinesWithParams';
import AddNewDtyMachine from "../pages/DTY/Machines/AddNewDtyMachine";
import DtyPresentLotAndTransfer from './../pages/DTY/FloorLayout/DtyPresentLotAndTransfer';
import DTYPresentLotHistory from "../pages/DTY/DTYPresentLotHistory/DTYPresentLotHistory";
import DTYLotDetails from "../pages/DTY/DTYLotDetails/DTYLotDetails";
import DTYMachineUpdates from './../pages/DTY/FloorLayout/DTYMachineUpdates';
import DtyProcessParams from "../pages/DTY/DTYProcessParameters/DtyProcessParams";
import PoyFloorLayout from './../pages/POY/FloorLayout/PoyFloorLayout';
import PoyPresentLotAndTransfer from './../pages/POY/FloorLayout/PoyPresentLotAndTransfer';
import DenierwisePOYLines from './../pages/POY/FloorLayout/DenierwisePOYLines';
import PoyWinder from './../pages/POY/FloorLayout/PoyWinder';
import AddNewParamStatic from "../pages/DTY/DTYProcessParameters/AddNewParamStatic";
import DashboardLayout from "../layouts/DashboardLayout";
import Welcome from "../pages/Dashboard/Home/Welcome";
import MachinesList from "../pages/Dashboard/Machines/MachinesList";
import DTYMachinesList from "../pages/Dashboard/Machines/DTYMachinesList";
import POYMachinesList from "../pages/Dashboard/Machines/POYMachinesList";
import DTYLotNoExplanation from "../pages/DTY/DTYLotNoExplanation/DTYLotNoExplanation";
import UsersList from "../pages/Dashboard/Users/UsersList";
import InputDTYProductionReport from "../pages/InputExcelData/InputDTYProductionReport";

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
                path: '/home',
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
                element: <PrivateRoute><CheckingRoute><DtyMachinesWithParams /></CheckingRoute>,</PrivateRoute>
            },
            {
                path: "/dty-floor-status/dty-machine/new-machine",
                element: <PrivateRoute><CheckingRoute><AddNewDtyMachine/></CheckingRoute></PrivateRoute>
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
                element: <PrivateRoute><CheckingRoute><AddNewParamStatic/></CheckingRoute></PrivateRoute>
            },
            {
                path: "/dty-lot-number-explanation",
                element: <DTYLotNoExplanation />
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
                element: <PrivateRoute><CheckingRoute><InputExcelData /></CheckingRoute></PrivateRoute>,
            },
            {
                path: "/upload/excel/dty-production-report",
                element: <PrivateRoute><CheckingRoute><InputDTYProductionReport /></CheckingRoute></PrivateRoute>
            },
            {
                path: "/upload/excel/download-file-uploading-formats",
                element: <PrivateRoute><CheckingRoute><FileUpFormats /></CheckingRoute></PrivateRoute>
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Welcome/>
            },
            {
                path: "/dashboard/machines",
                element: <CheckingRoute><MachinesList/></CheckingRoute>
            },
            {
                path: "/dashboard/machines/dty-machines-list",
                element: <CheckingRoute><DTYMachinesList/></CheckingRoute>
            },
            {
                path: "/dashboard/machines/poy-machines-list",
                element: <CheckingRoute><POYMachinesList/></CheckingRoute>
            },
            {
                path: "/dashboard/users",
                element: <CheckingRoute><UsersList/></CheckingRoute>
            },
        ]
    }
])