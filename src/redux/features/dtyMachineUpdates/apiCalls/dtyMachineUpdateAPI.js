import axios from "../../../../utils/axios.config";
import { toast } from "react-hot-toast";

export const postDtyMachineUpdate = async (newMCDetails, changedProps, updatedFrom) => {
    const data = await axios.post("/api/v1/dty-machine-updates", {newMCDetails, changedProps, updatedFrom});
    if (data.data.acknowledged) {
        toast.success(`Recorded New Machine Update #${newMCDetails.DTYMCNo}`, { id: newMCDetails.DTYMCNo });
    }
}

export const fetchDtyMachineUpdates = async() =>{
    const data = await axios.get("/api/v1/dty-machine-updates");
    return data.data;
}