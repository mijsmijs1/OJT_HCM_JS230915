import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { candidateAction, candidateReducer } from "./slices/candidate.slice"
import { companyAction, companyReducer } from "./slices/company.slice"

const RootReducer = combineReducers({
    candidateStore: candidateReducer,
    companyStore: companyReducer,
})

export type Store = ReturnType<typeof RootReducer>

export const store = configureStore({
    reducer: RootReducer
})

store.dispatch(candidateAction.fetchCandidate())
store.dispatch(companyAction.fetchCompany())

export default store