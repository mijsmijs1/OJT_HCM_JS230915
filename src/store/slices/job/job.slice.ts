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
    location: Location
    typeJobs: TypeJob[]
    levelJobs: TypeJob[]
    candidates: Candidate[]
}
/* INTERFACE */
interface InitState {
    jobs: Job[] | null,
    job: Job | null,
    levelJob: LevelJob[] | null,
    typeJob: TypeJob[] | null,
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
            console.log({ data: res.data.data, message: res.data.message })
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            rejectWithValue({ message: err.response.data.message })
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
            rejectWithValue({ message: err.response.data.message })
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
            rejectWithValue({ message: err.response.data.message })
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
        //Create job
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.typeJob = action.payload?.data
        })
    }

})

export const jobReducer = jobSlice.reducer;
export const jobAction = jobSlice.actions;
