import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { getGHRepos } from "./api";

const initialState = {
    items: [],
    loading: false,
    error: null,
    fulfilled: false,
}

export const getRepos = createAsyncThunk('repo/getRepos', async (username, trunkAPI) => {
    try {
        return await getGHRepos(username);
    }catch (error) {
        if(error.response.status === 401){
            return trunkAPI.rejectWithValue("You are not authorized");
        }
        return trunkAPI.rejectWithValue("Repos are not found");
    }
});

export const repoSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setRepos: (_, action) => {return action.payload},
    },
    extraReducers: {
        [getRepos.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.fulfilled = true;
            state.loading = false;
            state.error = false;
        },
        [getRepos.rejected]: (state, action) => {
            state.items = [];
            state.error=action.payload;
        },
        [getRepos.pending]: (state) => {
            state.loading = true
        },
    }
})

export const { setRepos } = repoSlice.actions

export default repoSlice.reducer;
