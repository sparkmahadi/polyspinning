import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchMcMergedeDataFromLot = async () => {
    const data = await axios.get("/api/v1/dty-machine-details-from-present-lot/sortedAndMerged/");
    return data.data;
}

export const fetchMceDataFromLot = async () => {
    const data = await axios.get("/api/v1/dty-machine-details-from-present-lot/");
    return data.data;
}

export const postMachine = async (newMCDetails) => {
    const data = await axios.post("/api/v1/dty-machine-details-from-present-lot/", newMCDetails);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Machine #${newMCDetails.DTYMCNo}`, { id: newMCDetails.DTYMCNo });
    }
}

export const modifyMahcineData = async (oneMCDetails, changedProps) => {
    const data = await axios.put("/api/v1/dty-machine-details-from-present-lot/", { oneMCDetails, changedProps });
    if (data.data.acknowledged) {
        toast.success(`Updated Machine No. #${oneMCDetails.DTYMCNo}`, { id: "updated" + oneMCDetails.DTYMCNo });
    }
}

export const modifyMainMachineLot = async (newLotData) => {
    console.log("newLotData", newLotData);
    const data = await axios.put("/api/v1/dty-machines/update-from-present-lot", newLotData);
    console.log('updating main machine', data);
    if (data.data.acknowledged) {
        toast.success(`Updated Machine No. #${newLotData.DTYMCNo}`, { id: "updated" + newLotData.DTYMCNo });
    }
}