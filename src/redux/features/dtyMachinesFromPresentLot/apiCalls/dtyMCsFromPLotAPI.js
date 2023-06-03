import axios from "../../../../utils/axios.config";

export const fetchMachineDataFromLot = async () => {
    const data = await axios.get("/dty-machine-details-from-present-lot");
    console.log('here', data);
    return data.data;
}