import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { candidateAction, candidateReducer } from "./slices/candidate/candidate.slice"
import { candidateEducationAction, candidateEducationReducer } from "./slices/candidate/education.slice"
import { candidateExperienceAction, candidateExperienceReducer } from "./slices/candidate/experience.slice"
import { candidateCertificateAction, candidateCertificateReducer } from "./slices/candidate/certificate.slice";
import { companyAction, companyReducer } from "./slices/company/company.slice"
import { fetchJobLevel, fetchTypeJob, jobReducer } from "./slices/job/job.slice";

const RootReducer = combineReducers({
    candidateStore: candidateReducer,
    educationStore: candidateEducationReducer,
    experienceStore: candidateExperienceReducer,
    certificateStore: candidateCertificateReducer,
    companyStore: companyReducer,
    jobStore: jobReducer
})

export type Store = ReturnType<typeof RootReducer>

export const store = configureStore({
    reducer: RootReducer
})
// candidate
store.dispatch(candidateAction.fetchCandidate())
store.dispatch(candidateEducationAction.fetchCandidateEducation())
store.dispatch(candidateExperienceAction.fetchCandidateExperience())
store.dispatch(candidateCertificateAction.fetchCandidateCertificates())
store.dispatch(fetchTypeJob())
store.dispatch(fetchJobLevel())
// company
store.dispatch(companyAction.fetchCompanyAccount())

export default store