import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Candidate } from "../candidate/candidate.slice"
import { Company } from '../company/company.slice'
import apis from '@services/apis'

// types jobs
export type Types_Jobs = {
    id: number
    job: Job
    typeJob: TypeJob
}

// levels jobs
export type Levels_Jobs = {
    id: number
    job: Job
    levelJob: LevelJob
}

// type job
export type TypeJob = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

//  level job
export type LevelJob = {
    id: number
    name: string
    created_at: string
    updated_at: string
}
export type Location = {
    id: number
    name: string
    created_at: string
    updated_at: string
}
// JOB
export type Job = {
    id: number
    title: string
    description: string
    salary: string
    created_at: string
    updated_at: string
    expire_at: string
    conpany_id: number
    company: Company
    location_id: number
    company_id: number
    location: Location
    typeJobs: TypeJob[]
    levelJob: LevelJob
    candidates: Candidate[]
}
/* INTERFACE */
interface InitState {
    jobs: Job[] | null,
    job: Job | null,
    levelJob: LevelJob[] | null,
    typeJob: TypeJob[] | null,
    jobCount: number,
    loadingJob: boolean,
    loadingJobs: boolean,
    errorJob: string | undefined,
    errorJobs: string | undefined
}

/* INIT */
let initialState: InitState = {
    //Data
    jobs: null,
    job: null,
    levelJob: null,
    typeJob: null,
    jobCount: 0,
    //Loading
    loadingJob: false,
    loadingJobs: false,

    //Error
    errorJob: undefined,
    errorJobs: undefined
}

//CALL API
export const fetchJobLevel = createAsyncThunk(
    'job/fetchJobLevel',
    async (_, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.getLevelJob()
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)

export const fetchTypeJob = createAsyncThunk(
    'job/fetchTypeJob',
    async (_, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.getTypeJob()
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const createJob = createAsyncThunk(
    'job/createJob',
    async ({ createData }: { createData: any }, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.createJob(createData)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchJobForCompanyPage = createAsyncThunk(
    'job/fetchJobForCompanyPage',
    async ({ companyId, page }: { companyId: number, page: number }, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.getJobByCompanyId(companyId, page)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }

            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchJobForDetail = createAsyncThunk(
    'job/fetchJobForDetail',
    async ({ jobId }: { jobId: number }, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.getJob(jobId)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }

            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const updateJob = createAsyncThunk(
    'job/updateJob',
    async ({ jobId, updateData }: { jobId: number, updateData: any }, { rejectWithValue }) => {
        try {
            let res = await apis.jobApi.update(jobId, updateData)
            if (updateData.status == 'inactive') {
                return { data: { jobId } }
            }
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
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //Fetch Level Job
        builder.addCase(fetchJobLevel.fulfilled, (state, action) => {
            state.levelJob = action.payload?.data
        })
        //Fetch Type Job
        builder.addCase(fetchTypeJob.fulfilled, (state, action) => {
            state.typeJob = action.payload?.data
        })
        //Fetch Jobs By CompanyId
        builder.addCase(fetchJobForCompanyPage.fulfilled, (state, action) => {
            state.jobs = action.payload?.data?.job
            state.jobCount = action.payload?.data?.count
        })
        //Create job
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.typeJob = action.payload?.data
        })
        //Fetch one Job
        builder.addCase(fetchJobForDetail.pending, (state) => {
            state.loadingJob = true;
        })
        builder.addCase(fetchJobForDetail.fulfilled, (state, action) => {
            state.job = action.payload.data;
            state.loadingJob = false
        })
        builder.addCase(fetchJobForDetail.rejected, (state) => {
            state.loadingJob = false
        })

        //Update job
        builder.addCase(updateJob.fulfilled, (state, action) => {

            if (state.jobs) {
                if (!action.payload.message) {
                    state.jobs = state.jobs.filter(item => item.id != action.payload?.data?.jobId)
                } else {
                    state.jobs = state.jobs.map(item => {
                        if (item.id == action.payload?.data.id) {
                            return action.payload.data
                        }
                        return item
                    })
                }

            }
            if (state.job) {
                state.job = action.payload?.data
            }
        })
    }

})

export const jobReducer = jobSlice.reducer;
export const jobAction = jobSlice.actions;
