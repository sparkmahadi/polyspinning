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