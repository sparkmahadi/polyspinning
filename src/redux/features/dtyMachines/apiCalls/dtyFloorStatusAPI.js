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
    console.log(newMCNo, Side, Props);
    if (newMCNo && Props) {
        const data = await axios.put(`/api/v1/dty-machines/update-other-side-property?DTYMCNo=${newMCNo}&Side=${Side}&UpdatesFrom=${oldMC}`, { Props });
        if (data.data.acknowledged) {
            toast.success(`Updated Machine No. #${newMCNo}/${Side} From This Side`, { id: "updated" + newMCNo + Side });
        }
    } else {
        console.log('please put valid informations');
    }
}
export const modifyDtyMachine = async (DTYMCNo, Side, changedProps) => {
    console.log(DTYMCNo, Side, changedProps);
    if (DTYMCNo && changedProps) {
        const data = await axios.put(`/api/v1/dty-machines/update-manually?DTYMCNo=${DTYMCNo}&Side=${Side}`, { changedProps });
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