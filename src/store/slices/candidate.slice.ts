import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job } from "./job.slice"

export enum CandidateGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

// education
export type EducationCandidate = {
    id: number
    candidate_id: number
    name_education: string
    major: string
    started_at: string
    end_at: string
    info: string
}

// experience
export type ExperienceCandidate = {
    id: number
    candidate_id: number
    position: string
    company: string
    started_at: string
    end_at: string
    info: string
}

// project
export type ProjectCandidate = {
    id: number
    candidate_id: number
    name: string
    link: string
    started_at: string
    end_at: string
    info: string
}

// certificate
export type CertificateCandidate = {
    id: number
    candidate_id: number
    name: string
    organization: string
    started_at: string
    end_at: string
    info: string
}

// skill
export type SkillsCandidate = {
    id: number
    candidate_id: number
    name: string
    level_job_id: number
    started_at: string
    end_at: string
    info: string
}

// CANDIDATE
export type Candidate = {

    id: number
    name: string
    isOpen: boolean
    dob: string
    // birthday: string
    address: string
    email: string
    phone: string
    password: string
    gender: CandidateGender,
    link_fb: string,
    link_linkedin: string,
    link_git: string,
    education: EducationCandidate[],
    experience: ExperienceCandidate[],
    projects: ProjectCandidate[],
    certificates: CertificateCandidate[],
    skills: SkillsCandidate[],
    jobs: Job[]

}

/* INTERFACE */
interface InitState {
    data: Candidate | null,
    loading: boolean,
    error: string | null
}

/* INIT */
let initialState: InitState = {
    data: null,
    loading: false,
    error: null
}

// fetch candidate
const fetchCandidate = createAsyncThunk(
    'candidate/checkToken',
    async () => {
        const res = await api.authenApi.checkToken()
        return res.data.data
    }
)

const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        updateData: (state, action) => {
            state.data = { ...state.data, ...action.payload }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCandidate.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchCandidate.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null
        })
        builder.addCase(fetchCandidate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })
    }
})

export const candidateReducer = candidateSlice.reducer;
export const candidateAction = {
    ...candidateSlice.actions,
    fetchCandidate
}