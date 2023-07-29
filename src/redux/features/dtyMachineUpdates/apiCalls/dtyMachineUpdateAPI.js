import axios from "../../../../utils/axios.config";
import { toast } from "react-hot-toast";

export const postDtyMachineUpdate = async (updateInfo) => {
    const {machineData, updatedProperties, updatedFrom, updatedAt} = updateInfo;
    const data = await axios.post("/api/v1/dty-machine-updates", {machineData, updatedProperties, updatedFrom, updatedAt});
    if (data.data.acknowledged) {
        toast.success(`Recorded New Machine Update #${machineData.DTYMCNo}`, { id: machineData.DTYMCNo });
    }
}

export const fetchDtyMachineUpdates = async() =>{
    const data = await axios.get("/api/v1/dty-machine-updates");
    return data.data;
}