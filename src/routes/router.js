import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import DtyFloorLayout from "../pages/FloorLayout/DTY/DtyFloorLayout";
import DtyMachineDetails from "../pages/Machines/DtyMachineDetails";
import InputExcelData from "../pages/InputExcelData/InputExcelData";
import AddNewDtyMachine from "../pages/Machines/AddNewDtyMachine";
import DtyMachinesFromPresentLot from "../pages/FloorLayout/DTY/DtyMachinesFromPresentLot";
import Login from "../pages/Logging/Login/Login";
import Register from './../pages/Logging/Register/Register';
import ResetPassword from "../pages/Logging/ResetPassword/ResetPassword";
import DtyProcessParams from "../pages/DTYProcessParameters/DtyProcessParams";
import AddNewParameter from "../pages/DTYProcessParameters/AddNewParameter";
import DtyMachinesWithParams from "../pages/FloorLayout/DTY/DtyMachinesWithParams";
import DtyPresentLotAndTransfer from "../pages/FloorLayout/DTY/DtyPresentLotAndTransfer";
import PoyPresentLotAndTransfer from './../pages/FloorLayout/POY/PoyPresentLotAndTransfer';
import PoyWinder from "../pages/FloorLayout/POY/PoyWinder";

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
                element: <DtyMachinesFromPresentLot />
            },
            {
                path: "/dty-floor-status/dty-machines/:machineNo",
                element: <DtyMachineDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/dtyMachines/${params.machineNo}`),
            },
            {
                path: "/dty-floor-status/dty-machines-with-parameters",
                element: <DtyMachinesWithParams />,
            },
            {
                path: "/dty-floor-status/dty-machine/new-machine",
                element: <AddNewDtyMachine />
            },
            {
                path: "/dty-floor-status/present-lot-and-transfer-area",
                element: <DtyPresentLotAndTransfer />
            },
            {
                path: "/dty-process-parameters",
                element: <DtyProcessParams />
            },
            {
                path: "/dty-process-parameters/add-new-parameter",
                element: <AddNewParameter />
            },
            {
                path: "/poy-floor-status/present-lot-and-transfer-area",
                element: <PoyPresentLotAndTransfer />
            },
            {
                path: "/poy-winders/:WinderNo",
                element: <PoyWinder />
            },
            {
                path: "/upload/excel",
                element: <InputExcelData />
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