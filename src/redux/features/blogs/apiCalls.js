import { toast } from "react-hot-toast";
import axios from "../../../utils/axios.config";

export const fetchBlogs = async () => {
    const data = await axios.get("/api/v1/blogs");
    return data.data;
}

// export const updateUserVerification = async (email) =>{
//     const data = await axios.put(`/api/v1/users/${email}`, { verified: true });
//     if (data.data.modifiedCount > 0) {
//         toast.success(`${email} is verified successfully`);
//     }
//     else {
//         toast.error("Nothing to update!!!")
//     }
//     return email;
// }

// export const deleteUser = async (id) => {
//     const data = await axios.delete(`/api/v1/users/${id}`);
//     if(data.data.deletedCount > 0){
//         toast.success(`User #${id} is deleted successfully!!!`);
//     }
//     return data.data;
// }