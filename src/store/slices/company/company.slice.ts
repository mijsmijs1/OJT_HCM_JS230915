import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job } from '../job/job.slice'


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
    address: string
    map_url: string
    location_id: number
    location: Location
    created_at: string
    updated_at: string
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
    email: string
    phone: string
    name: string
    logo: string
    status: status
    website: string
    link_fb: string
    link_linkedin: string
    link_git: string
    follower: number
    size: string
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
    companyCount: number,
    company: Company | null,
    typeCompany: Type_Company[] | null,
    addressByCompanyId: Address_Company[] | null,
    loadingAccount: boolean,
    loadingCompanies: boolean,
    loadingCompany: boolean,
    errorAccount: string | undefined,
    errorCompanies: string | undefined,
    errorCompany: string | undefined,
    errorAddress: string | undefined
}

/* INIT */
let initialState: InitState = {
    //Data
    data: null,
    companies: null,
    company: null,
    companyCount: 0,
    typeCompany: null,
    addressByCompanyId: null,
    //Loading
    loadingAccount: false,
    loadingCompanies: false,
    loadingCompany: false,

    //Error
    errorAccount: undefined,
    errorCompanies: undefined,
    errorCompany: undefined,
    errorAddress: undefined
}

// CALL API

export const fetchCompanies = createAsyncThunk(
    'company/fetchCompanies',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.companyApi.findAllCompany()
            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)

export const fetchCompanyById = createAsyncThunk(
    'company/fetchCompany',
    async (CompanyId: number, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.findCompanyById(CompanyId)
            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)

export const fetchCompanyByType = createAsyncThunk(
    'company/fetchCompanyByType',
    async (typeId: number, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.findCompanyByType(typeId)
            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)

export const searchCompany = createAsyncThunk(
    'company/searchCompany',
    async ({ page, pageSize, keyword, address }: { page: number, pageSize: number, keyword: string, address: string }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.search(page, pageSize, keyword, address)
            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
// fetch company
export const fetchCompanyAccount = createAsyncThunk(
    'company/validateToken',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.authenApi.checkToken();
            if (res.data.data.role === 'company') {
                return res.data.data;
            } else {
                return rejectWithValue(false);
            }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
);

export const updateAddress = createAsyncThunk(
    'company/updateAddress',
    async ({ companyId, addressId, updateData }: { companyId: number, addressId: number, updateData: any }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.updateAddess(companyId, addressId, updateData)
            console.log({ data: res.data.data, message: res.data.message })
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            if (err.response.data.statusCode == 422) {
                return rejectWithValue({ message: err.response.data.errors.join(' ') })
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)

export const updateCompany = createAsyncThunk(
    'company/updateCompany',
    async ({ companyId, updateCompanyData }: { companyId: number, updateCompanyData: any }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.update(companyId, updateCompanyData)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            if (err.response.data.statusCode == 422) {
                return rejectWithValue({ message: err.response.data.errors.join(' ') })
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const createAddress = createAsyncThunk(
    'company/createAddress',
    async ({ companyId, createData }: { companyId: number, createData: any }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.createAddress(companyId, createData)
            console.log({ data: res.data.data, message: res.data.message })
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            console.log(err)
            if (!err.response) {
                throw err
            }
            if (err.response.data.statusCode == 422) {
                return rejectWithValue({ message: err.response.data.errors.join(' ') })
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const deleteAddress = createAsyncThunk(
    'company/deleteAddress',
    async ({ companyId, addressId }: { companyId: number, addressId: number }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.deleteAddress(companyId, addressId)
            return { addressId, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            if (err.response.data.statusCode == 422) {
                return rejectWithValue({ message: err.response.data.errors.join(' ') })
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const createCompany = createAsyncThunk(
    'company/createCompany',
    async ({ createData }: { createData: any }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.createCompany(createData)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            if (err.response.data.statusCode == 422) {
                return rejectWithValue({ message: err.response.data.errors.join(' ') })
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchTypeCompany = createAsyncThunk(
    'company/fetchTypeCompany',
    async (_, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.getTypeCompany()
            return { message: res.data.message, data: res.data.data }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchAddressByCompanyId = createAsyncThunk(
    'company/fetchAddressByCompanyId',
    async ({ companyId }: { companyId: number }, { rejectWithValue }) => {
        try {
            let res = await api.companyApi.getAddressById(companyId)
            return { message: res.data.message, data: res.data.data }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
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
        // Fetch Account Data
        builder.addCase(fetchCompanyAccount.pending, (state) => {
            state.loadingAccount = true;
        })
        builder.addCase(fetchCompanyAccount.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loadingAccount = false;
        })
        //Fetch companies data for account page
        builder.addCase(fetchCompanies.pending, (state) => {
            state.loadingCompanies = true;
        })
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.companies = action.payload;
            state.loadingCompanies = false
        })
        builder.addCase(fetchCompanies.rejected, (state, action) => {
            state.loadingCompanies = false
            state.errorCompanies = action.payload ? String(action.payload) : action.error.message ? String(action.error.message) : 'Unknown error';
        })
        //Search Data
        builder.addCase(searchCompany.pending, (state) => {
            state.loadingCompanies = true;
        })
        builder.addCase(searchCompany.fulfilled, (state, action) => {
            state.companies = action.payload.companies;
            state.companyCount = action.payload.count;
            state.loadingCompanies = false
        })
        builder.addCase(searchCompany.rejected, (state) => {
            state.loadingCompanies = false
            state.companies = null;
            state.companyCount = 0;
        })
        //Fetch companies by Type
        builder.addCase(fetchCompanyByType.pending, (state) => {
            state.loadingCompanies = true;
        })
        builder.addCase(fetchCompanyByType.fulfilled, (state, action) => {
            state.companies = action.payload;
            state.loadingCompanies = false
        })
        builder.addCase(fetchCompanyByType.rejected, (state) => {
            state.loadingCompanies = false
        })
        //Fetch company data for comapay Info page
        builder.addCase(fetchCompanyById.pending, (state) => {
            state.loadingCompany = true
        })
        builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
            state.company = action.payload;
            state.loadingCompany = false
        })
        builder.addCase(fetchCompanyById.rejected, (state, action) => {
            state.errorCompany = action.payload ? String(action.payload) : action.error.message ? String(action.error.message) : 'Unknown error';
            state.loadingCompany = false
        })
        //Fetch Address By ID for Add Job page
        builder.addCase(fetchAddressByCompanyId.fulfilled, (state, action) => {
            state.addressByCompanyId = action.payload.data;
        })
        //Fetch Type Company
        builder.addCase(fetchTypeCompany.fulfilled, (state, action) => {
            state.typeCompany = action.payload.data
        })

        //CreateAddress
        builder.addCase(createAddress.pending, (state) => {
            state.loadingCompany = true
        })
        builder.addCase(createAddress.fulfilled, (state, action) => {
            state.company?.address_companies?.push(action.payload?.data)
            state.loadingCompany = false
        })
        builder.addCase(createAddress.rejected, (state) => {
            state.loadingCompany = false
        })

        //Update Address
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            if (state.company && state.company.address_companies) {
                state.company.address_companies = state.company.address_companies.map(item => {
                    if (item.id == action.payload.data.id) {
                        return action.payload.data
                    }
                    return item
                })
            }
        })
        builder.addCase(updateAddress.rejected, (state, action) => {
            state.errorAddress = action.payload ? String(action.payload) : 'Unknown error';
        })

        //Delele Address
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            if (state.company && state.company.address_companies) {
                state.company.address_companies = state.company?.address_companies?.filter(item => item.id != action.payload?.addressId)
            }
        })

        //Create Company
        builder.addCase(createCompany.fulfilled, (state, action) => {
            state.companies?.push(action.payload?.data)
        })

        //Update Company
        builder.addCase(updateCompany.fulfilled, (state, action) => {
            state.company = action.payload?.data
        })
        builder.addCase(updateCompany.rejected, (state, action) => {
            state.errorCompany = action.payload ? String(action.payload) : 'Unknown error';
        })
    }
})



export const companyReducer = companySlice.reducer;
export const companyAction = {
    ...companySlice.actions,
    fetchCompanyAccount
}