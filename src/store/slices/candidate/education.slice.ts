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
  async ({ candidateId }: { candidateId: number }, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found');
    }
    try {
      const res = await apis.candidateApi.findEucationById(candidateId);
      console.log('res',res);
         
      if (res.status < 200 || res.status >= 300) {
        throw new Error('Failed to fetch data')
      }
      return res.data.data as EducationCandidate[]; 
    } catch (err: any) {      
      return rejectWithValue(err.message);
    }
  }
)

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
