import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchBlogs } from "./apiCalls";

const initialState = {
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

// Helper function to create a deep copy of an object
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

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
    reducers: {
        setBlogDetails: (state, action) => {
            state.blogDetails = action.payload;
        },
        setArticle: (state, action) => {
            state.article = action.payload;
        },
        addArticleLevel: (state, action) => {
            const { level } = action.payload;
            if (level === 2) {
                state.article.detail.push(action.payload);
            }
        },
        addArticleLevel3: (state, action) => {
            const { parentObj, childObj, indexOfParentObj } = action.payload;
            // const updatedDetailArray = [...state.article.detail];
            console.log("result", state.article.detail[indexOfParentObj].detail);
            if(state.article.detail[indexOfParentObj].detail?.length){
                childObj.item = state.article.detail[indexOfParentObj].detail.length + 1;
                console.log('sum', state.article.detail[indexOfParentObj].detail.length + 1);
                state.article.detail[indexOfParentObj].detail.push(childObj);
            } else {
                childObj.item = 1;
                state.article.detail[indexOfParentObj].detail = [childObj];
            }
        },
        addArticleSectionToLvl2: (state, action) => {
            const {level} = action.payload;
            if (level === 2) {
                state.article.detail.push(action.payload);
            }
        },
        addArticleSectionToLvl3: (state, action) => {
            const newObj = action.payload;
            const {level, level2Index} = newObj;
            if (level === 3) {
                newObj.item = state.article.detail[level2Index]?.detail?.length + 1;
                state.article.detail[level2Index]?.detail.push(action.payload);
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
        addTitleToLvl1: (state, action) => {
            const title = action.payload;
        },
        addTitleToLvl2: (state, action) => {
            const title = action.payload;
        },
        addTitleToLvl3: (state, action) => {
            const title = action.payload;
        },
        addDetailToLvl1: (state, action) => {
            const Detail = action.payload;
        },
        addDetailToLvl2: (state, action) => {
            const Detail = action.payload;
        },
        addDetailToLvl3: (state, action) => {
            const Detail = action.payload;
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

    }
})

export const { setBlogDetails, setArticle, addArticleSectionToLvl2, deleteArticleSectionOfLvl2, addArticleSectionToLvl3, deleteArticleSectionOfLvl3, addArticleLevel3,
addTitleToLvl1, addTitleToLvl2, addTitleToLvl3,
addDetailToLvl1, addDetailToLvl2, addDetailToLvl3,
} = blogsSlice.actions;
export default blogsSlice.reducer;