import apis from '@services/apis';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CertificateCandidate = {
  id: number
  candidate_id: number
  name: string
  organization: string
  started_at: string
  end_at: string
  info: string
}

interface CertificateState {
  certificateData: CertificateCandidate[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificateData: null,
  loading: false,
  error: null,
}

export const fetchCandidateCertificates = createAsyncThunk(
  'candidate/fetchCertificates',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found');
    }
    try {
      const res = await apis.candidateApi.getCertificate();      
      if (res.status < 200 || res.status >= 300) {
        throw new Error('Failed to fetch data'); 
      }
      return res.data.data as CertificateCandidate[]; 
    } catch (err: any) {      
      return rejectWithValue(err.message);
    }
  }
)

const candidateCertificateSlice = createSlice({
  name: 'candidate_certificate',
  initialState,
  reducers: {
    setCertificateData(state, action: PayloadAction<CertificateCandidate[]>) {
      state.certificateData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateCertificates.fulfilled, (state, action) => {
        state.certificateData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCandidateCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const candidateCertificateReducer = candidateCertificateSlice.reducer;
export const candidateCertificateAction: any = {
  ...candidateCertificateSlice.actions,
  fetchCandidateCertificates,
}