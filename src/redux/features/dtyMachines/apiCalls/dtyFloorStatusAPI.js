import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchDtyMachines = async() =>{
    const data = await axios.get("/dty-machines");
    return data.data;
}

export const fetchDtyMachineDetails = async(machineWithSide) =>{
    const data = await axios.get(`/dty-machines/machine-details?machine=${machineWithSide}`);
    return data.data;
}

export const modifyDtyMachine = async(DTYMCNo, Side, changedProps) =>{
    console.log(DTYMCNo, Side, changedProps);
    if(DTYMCNo && Side && changedProps){
        const data = await axios.put(`/dty-machines/update-manually?DTYMCNo=${DTYMCNo}&Side=${Side}`, {changedProps});
        if(data.data.acknowledged){
            toast.success(`Machine #${DTYMCNo}/${Side} is updated`)
        }
    } else {
        console.log('please put valid informations');
    }
}