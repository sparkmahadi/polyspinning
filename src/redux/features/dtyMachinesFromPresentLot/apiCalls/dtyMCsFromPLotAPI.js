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
    await axios.post("/dty-machine-details-from-present-lot/", newMCDetails);
}

export const modifyMahcineData = async (oneMCDetails, changedProps) => {
    const data = await axios.put("http://localhost:5000/dty-machine-details-from-present-lot/", { oneMCDetails, changedProps });
    console.log(data);
}