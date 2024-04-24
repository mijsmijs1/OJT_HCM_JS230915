import apis from '@services/apis';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EducationCandidate = {
  id: number;
  candidate_id: number;
  name_education: string;
  major: string;
  started_at: string;
  end_at: string;
  info: string;
}

interface CandidateState {
  educationData: EducationCandidate[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  educationData: null,
  loading: false,
  error: null,
};

export const fetchCandidateEducation = createAsyncThunk(
  'candidate/fetchEducation',
  async () => {
    const res = await apis.candidateApi.getEducation();
    return res.data.data;
  }
);

const candidateEducationSlice = createSlice({
  name: 'candidate_education',
  initialState,
  reducers: {
    setEducationData(state, action: PayloadAction<EducationCandidate[]>) {
      state.educationData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateEducation.fulfilled, (state, action) => {
        state.educationData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCandidateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const candidateEducationReducer = candidateEducationSlice.reducer;
export const candidateEducationAction: any = {
  ...candidateEducationSlice.actions,
  fetchCandidateEducation
} 
