import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchBlogs } from "./apiCalls";

const initialState={
    blogs: [],
    blogDetails: {},
    postUserSuccess: false,
    updateUserSuccess: false,
    isLoading: false,
    isPosting: false,
    isError: false,
    error: '',
    article: 
        {
            title: "",
            detail: null,
            item: 1,
            level: 1,
        }
    
}

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
    const blogsData = fetchBlogs();
    return blogsData;
})

// export const verifyUser = createAsyncThunk("users/verifyUser", async (email, thunkAPI) => {
//     const userData = updateUserVerification(email);
//     // thunkAPI.dispatch(getUsers());
//     return userData;
// })

// export const removeUser = createAsyncThunk("users/removeUser", async (id, thunkAPI) => {
//     const userData = deleteUser(id);
//     thunkAPI.dispatch(getUsers());
//     return userData;
// })

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{
        setBlogDetails: (state, action) =>{
            state.blogDetails = action.payload;
        },
        setArticle: (state, action) =>{
            state.article = action.payload;
        },
        addArticleLevel: (state, action) =>{
            const {level} = action.payload;
            if(level === 2){
                state.article.detail.push(action.payload);
            }
        },
        addArticleSection: (state, action) =>{
            const {level} = action.payload;
            if(level === 2){
                state.article.detail.push(action.payload);
            }
        },
        deleteArticleSection: (state, action) =>{
            const {level, item} = action.payload;
            console.log("item", item);
            if(level === 2){
                state.article.detail = state.article.detail.filter(obj => obj.item !== item);
            }
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(getBlogs.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.blogs = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

    }
})

export const {setBlogDetails, setArticle, addArticleSection, deleteArticleSection } = blogsSlice.actions;
export default blogsSlice.reducer;