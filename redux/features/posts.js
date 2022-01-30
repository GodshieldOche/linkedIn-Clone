import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getPosts = createAsyncThunk(
    `posts/getPosts`,
    async (obj, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/posts`)
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeletePost = createAsyncThunk(
    `posts/postDeletePost`,
    async ({ postId, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/posts/${postId}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
        posts: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.posts.splice(payload, 1)
        },
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.loading = true
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.posts = payload.posts
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeletePost.pending]: (state) => {
            state.loading = true
        },
        [postDeletePost.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeletePost.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})

export const { deleteOne } = postsSlice.actions
export default postsSlice.reducer