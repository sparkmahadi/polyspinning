import { toast } from "react-hot-toast";
import axios from "../../../utils/axios.config";

export const fetchBlogs = async () => {
    const data = await axios.get("/api/v1/blogs");
    return data.data;
}

export const fetchBlogDetails = async (id) => {
    const data = await axios.get(`/api/v1/blogs/${id}`);
    return data.data;
}

export const postBlog = async (article) => {
    const data = await axios.post("/api/v1/blogs", article);
    if (data.data.acknowledged) {
        toast.success(`Inserted New Blog #${article.title}`, { id: article.title });
    }
    return article;
}

export const modifyArticleData = async (article) => {
    console.log(article);
    const data = await axios.put("/api/v1/blogs", article);
    if (data.data.acknowledged) {
        toast.success(`Updated Blog #${article.title}`, { id: "updated" + article.title });
    }
}

export const deleteArticle = async (id) => {
    const data = await axios.delete(`/api/v1/blogs/${id}`);
    if(data.data.deletedCount > 0){
        toast.success(`Article #${id} is deleted successfully!!!`);
    }
    return id;
}