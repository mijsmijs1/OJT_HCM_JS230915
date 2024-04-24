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
    async () => {
      const res = await apis.candidateApi.getExperience();
      return res.data.data;
    }
  );
  
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
  