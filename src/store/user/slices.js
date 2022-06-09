import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGHUser } from "./api";

export const initialState = {
    username: '',
    fullName: '',
    avatar: '',
    company: '',
    loading: false,
    error: null,
    fulfilled: false,
}

export const getUser = createAsyncThunk('user/getUser', async (userId, trunkAPI) => {
    try {
        return await getGHUser(userId);
    }catch (error) {
        if(error.response.status === 401){
            return trunkAPI.rejectWithValue("You are not authorized");
        }
        return trunkAPI.rejectWithValue("User not found");
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_, action) => {return action.payload},
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.username = action.payload.login;
            state.fullName = action.payload.name;
            state.avatar = action.payload.avatar_url;
            state.company = action.payload.company;
            state.fulfilled = true;
            state.loading = false;
            state.error = null;
        },
        [getUser.rejected]: (state, action) => {
            state.error=action.payload;
        },
        [getUser.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer;
