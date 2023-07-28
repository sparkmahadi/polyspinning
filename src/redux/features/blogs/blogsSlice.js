import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteArticle, fetchBlogDetails, fetchBlogs, modifyArticleData, postBlog } from "./apiCalls";

const initialState = {
    blogs: [],
    blogDetails: [],
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

// Helper function to create a deep copy of an object
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
    const blogsData = fetchBlogs();
    return blogsData;
})

export const getBlogDetails = createAsyncThunk("blogs/getBlogDetails", async (id) => {
    const blogData = fetchBlogDetails(id);
    return blogData;
})

export const addBlog = createAsyncThunk("blogs/addBlog", async (article, thunkAPI) => {
    const blogData = postBlog(article);
    thunkAPI.dispatch(getBlogs);
    return blogData;
})

export const updateArticle = createAsyncThunk("blogs/updateArticle", async (article) => {
    const blogData = modifyArticleData(article);
    return blogData;
})

export const removeArticle = createAsyncThunk("blogs/removeArticle", async (id, thunkAPI) => {
    const blogData = deleteArticle(id);
    // thunkAPI.dispatch(getBlogs);
    return blogData;
})

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setArticle: (state, action) => {
            state.article = action.payload;
        },
        addArticleLevel2: (state, action) => {
            const childObj = action.payload;
            if (Array.isArray(state.article.detail)) {
                state.article.detail.push(action.payload);
            } else {
                state.article.detail = [childObj];
            }
        },
        addArticleLevel3: (state, action) => {
            const { parentObj, childObj, indexOfParentObj } = action.payload;
            const lvl1Data = state.article.detail[indexOfParentObj];
            if (Array.isArray(lvl1Data.detail)) {
                childObj.item = lvl1Data.detail.length + 1;
                state.article.detail[indexOfParentObj].detail.push(childObj);
            } else {
                childObj.item = 1;
                state.article.detail[indexOfParentObj].detail = [childObj];
            }
        },
        addArticleLevel4: (state, action) => {
            const { parentObj, childObj, indexOfParentObj, indexOfGrandParentObj } = action.payload;
            const lvl2Data = state.article.detail[indexOfGrandParentObj].detail[indexOfParentObj];
            if (Array.isArray(lvl2Data?.detail)) {
                childObj.item = lvl2Data?.detail?.length + 1;
                state.article.detail[indexOfGrandParentObj].detail[indexOfParentObj].detail.push(childObj);
            } else {
                childObj.item = 1;
                state.article.detail[indexOfGrandParentObj].detail[indexOfParentObj].detail = [childObj];
            }
        },
        deleteArticleLevel2: (state, action) =>{
            state.article.detail = "";
        },
        deleteArticleLevel3: (state, action) =>{
            const parentIndex = action.payload;
            state.article.detail[parentIndex].detail = "";
        },
        deleteArticleLevel4: (state, action) =>{
            const {parentIndex, grandParentIndex} = action.payload;
            state.article.detail[grandParentIndex].detail[parentIndex].detail = "";
        },
        addArticleSectionToLvl2: (state, action) => {
            const { level } = action.payload;
            if (level === 2) {
                state.article.detail.push(action.payload);
            }
        },
        addArticleSectionToLvl3: (state, action) => {
            const newObj = action.payload;
            const { level, level2Index } = newObj;
            if (level === 3) {
                newObj.item = state.article.detail[level2Index]?.detail?.length + 1;
                state.article.detail[level2Index]?.detail.push(action.payload);
            }
        },
        addArticleSectionToLvl4: (state, action) => {
            const newObj = action.payload;
            const { level, level2Index, level3Index } = newObj;
            if (level === 4) {
                newObj.item = state.article.detail[level2Index]?.detail[level3Index]?.detail.length + 1;
                state.article.detail[level2Index]?.detail[level3Index]?.detail.push(action.payload);
            }
        },
        deleteArticleSectionOfLvl2: (state, action) => {
            const { level, item } = action.payload;
            if (level === 2) {
                state.article.detail = state.article.detail.filter(obj => obj.item !== item);
            }
        },
        deleteArticleSectionOfLvl3: (state, action) => {
            const obj = action.payload;
            const { item, level2Index } = obj;
            const newState = deepCopy(state.article);

            if (newState?.detail[level2Index]?.detail) {
                newState.detail[level2Index].detail = newState.detail[level2Index].detail.filter(
                    obj => obj.item !== item
                );
            }
            state.article = newState;
        },
        deleteArticleSectionOfLvl4: (state, action) => {
            const obj = action.payload;
            const { item, level2Index, level3Index } = obj;

            // Create a deep copy of the state to avoid direct mutation
            const newState = deepCopy(state.article);

            if (newState?.detail[level2Index]?.detail?.[level3Index]?.detail) {
                newState.detail[level2Index].detail[level3Index].detail = newState?.detail[level2Index]?.detail[level3Index].detail.filter(
                    obj => obj.item !== item
                );
            }
            state.article = newState;
        },
        addTitleToLvl1: (state, action) => {
            state.article.title = action.payload;
        },
        addDetailToLvl1: (state, action) => {
            state.article.detail = action.payload;
        },
        addTitleToLvl2: (state, action) => {
            const { title, objIndex } = action.payload;
            state.article.detail[objIndex].title = title;
        },
        addDetailToLvl2: (state, action) => {
            const { detail, objIndex } = action.payload;
            state.article.detail[objIndex].detail = detail;
        },
        addTitleToLvl3: (state, action) => {
            const { title, parentIndex, childIndex } = action.payload;
            state.article.detail[parentIndex].detail[childIndex].title = title;
        },
        addDetailToLvl3: (state, action) => {
            const { detail, parentIndex, childIndex } = action.payload;
            state.article.detail[parentIndex].detail[childIndex].detail = detail;
        },
        addTitleToLvl4: (state, action) => {
            const { title, grandParentIndex, parentIndex, childIndex } = action.payload;
            state.article.detail[grandParentIndex].detail[parentIndex].detail[childIndex].title = title;
        },
        addDetailToLvl4: (state, action) => {
            const { detail, grandParentIndex, parentIndex, childIndex } = action.payload;
            state.article.detail[grandParentIndex].detail[parentIndex].detail[childIndex].detail = detail;
        },
    },
    extraReducers: (builder) => {
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
        
        builder.addCase(addBlog.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(addBlog.fulfilled, (state, action) => {
            state.blogs.push(action.payload);
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(addBlog.rejected, (state, action) => {
            state.blogs = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })

        builder.addCase(removeArticle.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(removeArticle.fulfilled, (state, action) => {
            state.blogs = state.blogs?.filter(blog => blog._id !== action.payload);
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(removeArticle.rejected, (state, action) => {
            state.blogs = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        
        builder.addCase(getBlogDetails.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getBlogDetails.fulfilled, (state, action) => {
            state.blogDetails = [action.payload];
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getBlogDetails.rejected, (state, action) => {
            state.blogDetails = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export const {
    setArticle,
    addArticleSectionToLvl2, addArticleSectionToLvl3, addArticleSectionToLvl4,
    deleteArticleSectionOfLvl2, deleteArticleSectionOfLvl3, deleteArticleSectionOfLvl4,
    addArticleLevel2, addArticleLevel3, addArticleLevel4,
    deleteArticleLevel2, deleteArticleLevel3, deleteArticleLevel4,
    addTitleToLvl1, addTitleToLvl2, addTitleToLvl3, addTitleToLvl4,
    addDetailToLvl1, addDetailToLvl2, addDetailToLvl3, addDetailToLvl4,
} = blogsSlice.actions;
export default blogsSlice.reducer;