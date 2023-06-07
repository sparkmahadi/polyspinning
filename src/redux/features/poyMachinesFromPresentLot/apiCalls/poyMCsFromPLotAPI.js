import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchPoyMcDataFromLot = async () => {
    const data = await axios.get("/poy-machine-details-from-present-lot/");
    return data.data;
}

export const fetchPoyWinderData = async (WinderNo) => {
    const data = await axios.get(`/poy-winders/${WinderNo}`);
    return data.data;
}

export const postWinder = async (newWinderData) => {
    const data = await axios.post("/poy-machine-details-from-present-lot/", newWinderData);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Winder #${newWinderData.WinderNo}`, { id: newWinderData.WinderNo });
    }
}

export const modifyWinderData = async (winderDetails, changedProps) => {
    const data = await axios.put("/poy-machine-details-from-present-lot/", { winderDetails, changedProps });
    console.log('api', winderDetails);
    if (data.data.acknowledged) {
        toast.success(`Updated Winder No. #${winderDetails.WinderNo}`, { id: "updated" + winderDetails.WinderNo });
    }
}