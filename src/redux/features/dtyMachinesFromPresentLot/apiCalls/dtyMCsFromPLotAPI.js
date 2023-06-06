import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchMcMergedeDataFromLot = async () => {
    const data = await axios.get("/dty-machine-details-from-present-lot/sortedAndMerged/");
    console.log('here', data);
    return data.data;
}

export const fetchMceDataFromLot = async () => {
    const data = await axios.get("/dty-machine-details-from-present-lot/");
    return data.data;
}

export const postMachine = async (newMCDetails) => {
    const data = await axios.post("/dty-machine-details-from-present-lot/", newMCDetails);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Machine #${newMCDetails.DTYMCNo}`, { id: newMCDetails.DTYMCNo });
    }
}

export const modifyMahcineData = async (oneMCDetails, changedProps) => {
    const data = await axios.put("http://localhost:5000/dty-machine-details-from-present-lot/", { oneMCDetails, changedProps });
    if (data.data.acknowledged) {
        toast.success(`Updated Machine No. #${oneMCDetails.DTYMCNo}`, { id: "updated" + oneMCDetails.DTYMCNo });
    }
}