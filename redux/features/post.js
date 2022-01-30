import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const createPost = createAsyncThunk(
    `post/createPost`,
    async (postData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/posts`, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)



const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        post: {},
        message: null,
        success: false
    },
    reducers: {
        setPostState: (state, { payload }) => {
            state.post = payload
        },
    },
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
            state.post = payload.post
        },
        [createPost.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { setPostState } = postSlice.actions
export default postSlice.reducer