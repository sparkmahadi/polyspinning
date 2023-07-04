import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchPoyMcDataFromLot = async () => {
    const data = await axios.get("/api/v1/poy-machine-details-from-present-lot/");
    return data.data;
}

export const fetchPoyWinderData = async (WinderNo) => {
    const data = await axios.get(`/api/v1/poy-winders/${WinderNo}`);
    return data.data;
}

export const postWinder = async (newWinderData) => {
    const data = await axios.post("/api/v1/poy-machine-details-from-present-lot/", newWinderData);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Winder #${newWinderData.WinderNo}`, { id: newWinderData.WinderNo });
    }
}

export const modifyWinderData = async (winderDetails, changedProps) => {
    const data = await axios.put("/api/v1/poy-machine-details-from-present-lot/", { winderDetails, changedProps });
    if (data.data.acknowledged) {
        toast.success(`Updated Winder No. #${winderDetails.WinderNo}`, { id: "updated" + winderDetails.WinderNo });
    }
}

export const updateDtyMachineByPoyLot = async (poySummary, time) => {
    const data = await axios.put("/api/v1/poy-machine-details-from-present-lot/update-poyInfo-in-dty-machines", {poySummary, time});
    // console.log("input", poySummary, "data", data);
    if(typeof data.data === "string"){
        toast.error(data.data);
    }
    if(Array.isArray(data.data)){
        data.data?.forEach(dt => {
            if(dt.modifiedCount > 0){
                toast.success("POYInfo is updated at DTY Machine");
                console.log("POYInfo is updated at DTY Machine");
            }
        })
    }
}

// export const fetchAllWinderUpdates = async () => {
//     const data = await axios.get("/poy-winder-updates/");
//     return data.data;
// }

// export const fetchOneWinderUpdate = async (WinderNo) => {
//     const data = await axios.get(`/poy-winders/${WinderNo}`);
//     return data.data;
// }

export const postWinderUpdate = async (newWinderData) => {
    const data = await axios.post("/api/v1/poy-winder-updates", newWinderData);
    if (data.data.acknowledged) {
        toast.success(`Recorded in winder updates. Winder no: #${newWinderData.WinderData.WinderNo}`);
    }
}

export const deletePoyMachine = async (id) => {
    const data = await axios.delete(`/api/v1/poy-machine-details-from-present-lot/delete/${id}`);
    if(data.data.deletedCount > 0){
        toast.success(`Winder #${id} is deleted successfully!!!`);
    }
    return data.data;
}