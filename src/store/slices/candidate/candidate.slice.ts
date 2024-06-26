import apis from '@services/apis'
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

/* INTERFACE */
interface InitState {
    data: Candidate | null,
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
    data: null,
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
    'candidate/fetchData',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('Token not found')
        }
        try {
            const res = await apis.authenApi.checkToken()

            if (res.status < 200 || res.status >= 300) {
                throw new Error('Failed to fetch data');
            }
            if (res.data.data.role == 'candidate') {
                return res.data.data
            } else {
                return null
            }
        } catch (err: any) {
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
    }
})

export const candidateReducer = candidateSlice.reducer;
export const candidateAction: any = {
    ...candidateSlice.actions,
    fetchCandidate,
}