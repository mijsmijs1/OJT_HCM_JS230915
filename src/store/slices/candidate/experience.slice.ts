import apis from '@services/apis';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExperienceCandidate = {
    id: number
    candidate_id: number
    position: string
    company: string
    started_at: string
    end_at: string
    info: string
}
interface CandidateState {
    experienceData: ExperienceCandidate[] | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: CandidateState = {
    experienceData: null,
    loading: false,
    error: null,
  };
  
  export const fetchCandidateExperience = createAsyncThunk(
    'candidate/fetchExperience',
    async ({ candidateId }: { candidateId: number }, { rejectWithValue }) => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      try {
        const res = await apis.candidateApi.findExperienceById(candidateId);      
        if (res.status < 200 || res.status >= 300) {
          throw new Error('Failed to fetch data'); 
        }
        return res.data.data as ExperienceCandidate[]; 
      } catch (err: any) {      
        return rejectWithValue(err.message);
      }
    }
  )
  
  const candidateExperienceSlice = createSlice({
    name: 'candidate_experience',
    initialState,
    reducers: {
      setEducationData(state, action: PayloadAction<ExperienceCandidate[]>) {
        state.experienceData = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCandidateExperience .pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCandidateExperience .fulfilled, (state, action) => {
          state.experienceData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchCandidateExperience .rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unknown error';
        });
    },
  })
  
  export const candidateExperienceReducer = candidateExperienceSlice.reducer;
  export const candidateExperienceAction: any = {
    ...candidateExperienceSlice.actions,
    fetchCandidateExperience 
  } 
  