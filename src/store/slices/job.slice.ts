import api from '@services/apis'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Candidate } from "./candidate/candidate.slice"
import { Company } from './company/company.slice'

// types jobs
export type Types_Jobs = {
    id: number
    job: Job
    typeJob: TypeJob
}

// levels jobs
export type Levels_Jobs = {
    id: number
    job: Job
    levelJob: LevelJob
}

// type job
export type TypeJob = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

//  level job
export type LevelJob = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

// JOB
export type Job = {
    id: number
    title: string
    description: string
    salary: string
    created_at: string
    updated_at: string
    expire_at: string
    conpany_id: number
    company: Company
    location_id: number
    location: Location
    typeJobs: TypeJob[]
    levelJobs: TypeJob[]
    candidates: Candidate[]
}