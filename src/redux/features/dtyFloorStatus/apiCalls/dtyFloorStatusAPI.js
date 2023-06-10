import axios from "../../../../utils/axios.config";

export const fetchDtyMachines = async() =>{
    const data = await axios.get("/dty-machines");
    return data.data;
}

export const fetchDtyMachineDetails = async(machineWithSide) =>{
    const data = await axios.get(`/dty-machines/machine-details?machine=${machineWithSide}`);
    return data.data;
}
