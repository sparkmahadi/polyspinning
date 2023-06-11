import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchDtyParams = async () => {
    const data = await axios.get("/dty-process-parameters");
    return data.data;
}
export const fetchDtyParamsForComparison = async () => {
    const data = await axios.get("/dty-process-parameters?need=withoutIdAndTime");
    return data.data;
}

export const postDtyParameter = async (paramDetails) => {
    const data = await axios.post("/dty-process-parameters", paramDetails);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Parameter #${paramDetails.DTYMCNo}`, { id: paramDetails.DTYMCNo });
    }
}

export const fetchDtyParamsByMC = async (machineNo) => {
    const data = await axios.get(`/dty-process-parameters-by-query?machineNo=${machineNo}`);
    return data.data;
}

export const fetchDtyParamsByMachines = async (machines) => {
    const data = await axios.get(`/dty-process-parameters-by-query?machines=${machines}`);
    return data.data;
}

export const modifyMainMachineParam = async (newParameter) => {
    const data = await axios.put("/dty-machines/update-from-parameter", newParameter);
    console.log('updating main machine', data);
    if(Array.isArray(data.data)){
        data.data.forEach((dt) => {
            if (dt.acknowledged) {
                toast.success(`Updated Machine No. #${newParameter.DTYMCNo}, for both side`, { id: "updated" + newParameter.DTYMCNo });
            }
        })
    }
    else if (data.data.acknowledged) {
        toast.success(`Updated Machine No. #${newParameter.DTYMCNo}`, { id: "updated" + newParameter.DTYMCNo });
    }
}