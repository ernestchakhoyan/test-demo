import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from "./counter/slices";
import { userSlice } from "./user/slices";
import { repoSlice } from "./repo/slices";

export default configureStore({
    reducer: {
        counter: counterSlice.reducer,
        user: userSlice.reducer,
        repos: repoSlice.reducer,
    },
});
