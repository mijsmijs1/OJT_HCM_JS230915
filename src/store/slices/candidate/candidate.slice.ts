import api from '@services/apis'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Job } from "../job/job.slice.ts"
import { EducationCandidate } from './education.slice.ts'
import { ExperienceCandidate } from './experience.slice.ts'
import { CertificateCandidate } from './certificate.slice.ts'
import { SkillsCandidate } from './skill.slice.ts'
import { ProjectCandidate } from './project.slice.ts'

export enum CandidateGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

// CANDIDATE
export type Candidate = {
    id: number
    name: string
    isOpen: boolean
    dob: string
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
interface CV {
    id: number;
    cv_url: string;
    content: string;
    job: Job;
    candidate: Candidate;
    created_at: Date;
    updated_at: Date;
}
/* INTERFACE */
interface InitState {
    applyInfo: CV | null,
    data: Candidate | null,
    candidate: Candidate | null,
    candidates: Candidate[] | null,
    countCandidate: number,
    educationData: EducationCandidate[] | null,
    experienceData: ExperienceCandidate[] | null,
    projectData: ProjectCandidate[] | null,
    certificateData: CertificateCandidate[] | null,
    skillData: SkillsCandidate[] | null,
    loading: boolean,
    error: string | null
}

/* INIT */
let initialState: InitState = {
    applyInfo: null,
    data: null,
    candidate: null,
    candidates: null,
    countCandidate: 0,
    educationData: null,
    experienceData: null,
    projectData: null,
    certificateData: null,
    skillData: null,
    loading: false,
    error: null
}

// fetch candidate
const fetchCandidate = createAsyncThunk(
    'candidate/checkToken',
    async () => {
        const res = await api.authenApi.checkToken()
        if (res.data.data.role === 'candidate') {
            return res.data.data;
        } else {
            return false;
        }
    }
)
export const fetchCandidateById = createAsyncThunk(
    'candidate/fetchCandidateById',
    async ({ candidateId }: { candidateId: any }, { rejectWithValue }) => {
        try {
            let res = await api.candidateApi.findById(candidateId)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const applyJob = createAsyncThunk(
    'job/applyJob',
    async ({ applyData }: { applyData: any }, { rejectWithValue }) => {
        try {
            let res = await api.candidateApi.apply(applyData)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchCV = createAsyncThunk(
    'job/applyJob',
    async ({ candidateId, jobId }: { candidateId: number, jobId: number }, { rejectWithValue }) => {
        try {
            let res = await api.candidateApi.findCV(candidateId, jobId)
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
export const fetchAppliedCandidates = createAsyncThunk(
    'job/fetchAppliedCandidates',
    async ({ jobId, page, pageSize }: { jobId: number, page: number, pageSize: number }, { rejectWithValue }) => {
        try {
            let res = await api.candidateApi.findAppliedCandidates(jobId, page, pageSize)
            console.log({ data: res.data.data, message: res.data.message })
            return { data: res.data.data, message: res.data.message }
        } catch (err: any) {
            console.log(err)
            if (!err.response) {
                throw err
            }
            return rejectWithValue({ message: err.response.data.message })
        }
    }
)
const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Candidate>) => {
            state.data = action.payload;
        },
        updateData: (state, action: PayloadAction<Partial<Candidate>>) => {
            state.data = { ...state.data!, ...action.payload };
        },
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

        builder.addCase(fetchCandidateById.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchCandidateById.fulfilled, (state, action) => {
            state.candidate = action.payload.data;
            state.loading = false;
            state.error = null
        })
        builder.addCase(fetchCandidateById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })

        builder.addCase(fetchCV.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchCV.fulfilled, (state, action) => {
            state.applyInfo = action.payload.data;
            state.loading = false;
            state.error = null
        })
        builder.addCase(fetchCV.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })

        builder.addCase(fetchAppliedCandidates.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(fetchAppliedCandidates.fulfilled, (state, action) => {
            state.candidates = action.payload.data.candidates;
            state.countCandidate = action.payload.data.count;
            state.loading = false;
            state.error = null
        })
        builder.addCase(fetchAppliedCandidates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })
    }
})

export const candidateReducer = candidateSlice.reducer;
export const candidateAction: any = {
    ...candidateSlice.actions,
    fetchCandidate,
}