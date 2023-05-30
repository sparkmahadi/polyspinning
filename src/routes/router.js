import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import DtyFloorLayout from "../pages/FloorLayout/DtyFloorLayout";
import DtyMachineDetails from "../pages/Machines/DtyMachineDetails";
import InputExcelData from "../pages/InputExcelData/InputExcelData";
import AddNewDtyMachine from "../pages/Machines/AddNewDtyMachine";

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
                element: <DtyFloorLayout/>
            },
            {
                path: "/dty-floor-status/dty-machines/:machineNo",
                element: <DtyMachineDetails/>,
                loader: ({params})=>fetch(`http://localhost:5000/dtyMachines/${params.machineNo}`),
            },
            {
                path: "/dty-floor-status/dty-machine/new-machine",
                element: <AddNewDtyMachine/>
            },
            {
                path: "/upload/excel",
                element: <InputExcelData/>
            },
        ]
    }
])