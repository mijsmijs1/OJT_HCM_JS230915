import api from '@services/apis';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// user
export type user = {
    id: number
    username: string
    email: string
    emailStatus: boolean
    password: string
    phone: string
    address: string
    role: number
    avatar: string
    gender: number
    createAt: string
    updateAt: string
}

/* INTERFACE */
interface InitState {
    data: user | null,
    loading: boolean,
}
/* INIT */
let initialState: InitState = {
    data: null,
    loading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
    }
})

// fetch User
const fetchUser = createAsyncThunk(
    'user/validateToken',
    async () => {
        const res = await api.userApi.getData({
            token: localStorage.getItem("token") || "null"
        })
        return res.data.data
    }
)

export const userReducer = userSlice.reducer;
export const userAction = {
    ...userSlice.actions,
    fetchUser
}