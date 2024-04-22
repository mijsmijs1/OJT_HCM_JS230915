import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { candidateAction, candidateReducer } from "./slices/candidate/candidate.slice"
import { candidateEducationAction, candidateEducationReducer } from "./slices/candidate/education.slice"
import { candidateExperienceAction, candidateExperienceReducer } from "./slices/candidate/experience.slice"
import { candidateCertificateAction, candidateCertificateReducer } from "./slices/candidate/certificate.slice";
import { companyAction, companyReducer } from "./slices/company/company.slice"

const RootReducer = combineReducers({
    candidateStore: candidateReducer,
    educationStore: candidateEducationReducer,
    experienceStore: candidateExperienceReducer,
    certificateStore: candidateCertificateReducer,
    companyStore: companyReducer,
})

export type Store = ReturnType<typeof RootReducer>

export const store = configureStore({
    reducer: RootReducer
})

store.dispatch(candidateAction.fetchCandidate())
store.dispatch(candidateEducationAction.fetchCandidateEducation())
store.dispatch(candidateExperienceAction.fetchCandidateExperience())
store.dispatch(candidateCertificateAction.fetchCandidateCertificates());

export default store