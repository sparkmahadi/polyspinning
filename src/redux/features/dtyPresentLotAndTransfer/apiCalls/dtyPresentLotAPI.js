import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchLotData = async () => {
    const data = await axios.get("/api/v1/present-lot-and-transfer-area");
    return data.data;
}

export const postLotData = async (lotData) => {
    const data = await axios.post("/api/v1/present-lot-and-transfer-area", lotData);
    if(data.data.acknowledged){
        toast.success("New lot Data is Uploaded Successfully!!!")
    }
}

export const fetchPresentLotHistory = async () => {
    const data = await axios.get("/api/v1/present-lot-and-transfer-area/history");
    return data.data;
}

export const fetchLotDetailsById = async(lotId) =>{
    const data = await axios.get(`/api/v1/present-lot-and-transfer-area/history/${lotId}`)
    return data.data;
}