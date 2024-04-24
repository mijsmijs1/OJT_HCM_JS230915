import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job } from "../job.slice"

// account company
export type Account_Company ={
    id: number
    companies: Company[]
    email: string
    email_status: boolean
    password: string
}

// address company
export type Address_Company  ={
    id: number
    company_id: number
    company: Company[]
    address: string
    map_url: string
    location_id: number
    location: Location
}

// type company
export type Type_Company  ={
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
    data: Company | null,
    loading: boolean,
    error: string | null
}

/* INIT */
let initialState: InitState = {
    data: null,
    loading: false,
    error: null
}

// fetch company
const fetchCompany = createAsyncThunk(
    'company/checkToken',
    async () => {
        const res = await api.authenApi.checkToken()
        return res.data.data
    }
)

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompany.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchCompany.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(fetchCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })
    }
})

export const companyReducer = companySlice.reducer;
export const companyAction = {
    ...companySlice.actions,
    fetchCompany
}