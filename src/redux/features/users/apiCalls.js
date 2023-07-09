import { toast } from "react-hot-toast";
import axios from "../../../utils/axios.config";

export const fetchUsers = async () => {
    const data = await axios.get("/api/v1/users");
    return data.data;
}