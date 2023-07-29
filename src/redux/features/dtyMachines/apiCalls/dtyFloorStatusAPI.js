import { toast } from "react-hot-toast";
import axios from "../../../../utils/axios.config";

export const fetchDtyMachines = async () => {
    const data = await axios.get("/api/v1/dty-machines");
    return data.data;
}

export const fetchDtyMachineDetails = async (machineWithSide) => {
    const data = await axios.get(`/api/v1/dty-machines/machine-details?machine=${machineWithSide}`);
    return data.data;
}

export const fetchDtyMachinesBySearch = async (searchData) => {
    const data = await axios.get(`/api/v1/dty-machines/search?searchedCategory=${searchData.searchedCategory}&&searchedProp=${searchData.searchedProp}&&searchText=${searchData.searchText}`);
    return data.data;
}

export const modifyOtherMC = async (newMCNo, Side, oldMC, Props) => {
    console.log("modifyOtherMC:", newMCNo, Side, Props, oldMC);
    if (newMCNo && Props) {
        const data = await axios.put(`/api/v1/dty-machines/update-other-side-property?DTYMCNo=${newMCNo}&Side=${Side}&UpdatesFrom=${oldMC}`, { Props });
        if (data.data.modifiedCount > 0) {
            toast.success(`Updated Machine No. #${newMCNo}/${Side} From This Side`, { id: "updated" + newMCNo + Side });
        }
        else{
            toast.error(`Nothing to update in Machine No. #${newMCNo}/${Side}`)
        }
    } else {
        console.log('please put valid informations');
    }
}
export const modifyDtyMachine = async (DTYMCNo, Side, updatedMC) => {
    if (DTYMCNo && updatedMC) {
        const data = await axios.put(`/api/v1/dty-machines/update-manually?DTYMCNo=${DTYMCNo}&Side=${Side}`, { updatedMC });
        if (Array.isArray(data.data)) {
            data.data.forEach((dt) => {
                if (dt.acknowledged) {
                    toast.success(`Updated Machine No. #${DTYMCNo}, for both side`, { id: "updated" + DTYMCNo });
                }
            })
        }
        else if (data.data.acknowledged) {
            toast.success(`Updated Machine No. #${DTYMCNo} for ${Side}`, { id: "updated" + DTYMCNo });
        }
    } else {
        console.log('please put valid informations');
    }
}

export const deleteDtyMachine = async (id) => {
    const data = await axios.delete(`/api/v1/dty-machines/delete/${id}`);
    if(data.data.deletedCount > 0){
        toast.success(`Machine #${id} is deleted successfully!!!`);
    }
    return data.data;
}