import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job } from "./job.slice"

export type status = "active" | "inactive" | "block"
// account company
export type Account_Company = {
    id: number
    companies: Company[]
    email: string
    email_status: boolean
    password: string
    avatar: string
    displayName: string

}

// address company
export type Address_Company = {
    id: number
    company_id: number
    company: Company[]
    address: string
    map_url: string
    location_id: number
    location: Location
}

// type company
export type Type_Company = {
    id: number
    name: string
    created_at: string
    updated_at: string
    companies: Company[]
}

// COMPANY
export type Company = {
    id: number
    account_company_id: number
    account: Account_Company
    name: string
    logo: string
    status: status
    website: string
    link_fb: string
    link_linkedin: string
    link_git: string
    follower: number
    size: number
    description: string
    created_at: string
    updated_at: string
    address_companies: Address_Company[]
    type_company_id: number
    type_company: Type_Company
    jobs: Job[]
}

/* INTERFACE */
interface InitState {
    data: Account_Company | null,
    companies: Company[] | null,
    loading: boolean,
}

/* INIT */
let initialState: InitState = {
    data: null,
    companies: null,
    loading: false,
}
// CALL API

export const fetchCompanies = createAsyncThunk(
    'company/fetchCompanies',
    async () => {
        try {
            const res = await api.companyApi.findAllCompany()
            return res.data.data
        } catch (err) {
            throw err
        }
    }
)
// fetch company
export const fetchCompanyAccount = createAsyncThunk(
    'company/validateToken',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.authenApi.checkToken();
            if (res.data.data.role === 'company') {
                return res.data.data;
            } else {
                return rejectWithValue(false);
            }
        } catch (err: any) {
            // if (err.response && err.response.status === 504) {
            //     try {
            //         const refreshTokenRes = await api.authenApi.refreshToken(String(localStorage.getItem('refreshToken')));
            //         localStorage.setItem('token', refreshTokenRes.data.accessToken);
            //         const newTokenRes = await api.authenApi.checkToken();
            //         if (newTokenRes.data.data.role === 'company') {
            //             return newTokenRes.data.data;
            //         } else {
            //             localStorage.removeItem('token');
            //             localStorage.removeItem('refreshToken');
            //             return rejectWithValue(false);
            //         }
            //     } catch (refreshErr) {
            //         localStorage.removeItem('token');
            //         localStorage.removeItem('refreshToken');
            //         return rejectWithValue(false);
            //     }
            // } else {
            //     localStorage.removeItem('token');
            //     localStorage.removeItem('refreshToken');
            //     return rejectWithValue(false);
            // }
            return rejectWithValue(false);
        }
    }
);

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompanyAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCompanyAccount.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCompanies.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.companies = action.payload;
            state.loading = false
        })
    }
})



export const companyReducer = companySlice.reducer;
export const companyAction = {
    ...companySlice.actions,
    fetchCompanyAccount
}