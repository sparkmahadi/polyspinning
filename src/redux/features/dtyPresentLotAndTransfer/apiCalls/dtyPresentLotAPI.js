import axios from "../../../../utils/axios.config";

export const fetchLotData = async () => {
    const data = await axios.get("/present-lot-and-transfer-area");
    return data.data;
}