import axios from "axios"

const prefix = "job"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const jobApi = {
    checkJob: async (jobId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/check-job/${jobId}`)
    },
    getTypeJob: async () => {
        return await axios.get(`${SERVER_BASE_URL}/type-job`)
    },
    getLevelJob: async () => {
        return await axios.get(`${SERVER_BASE_URL}/level-job`)
    },
    getJobByCompanyId: async (companyId: number, page: number) => {
        return await axios.get(`${SERVER_BASE_URL}/get-job-by-companyId/${companyId}/info?page=${page}`)
    },
    getJob: async (jobId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/${jobId}`)
    },
    getJobForHome: async () => {
        return await axios.get(`${SERVER_BASE_URL}/get-job-home`)
    },
    getJobForSearch: async (page: number, pageSize: number, keyword: string, address: string, typeJobId: number, levelJobId: number, time: string) => {
        return await axios.get(`${SERVER_BASE_URL}/search?page=${page}&pageSize=${pageSize}&keyword=${keyword}&address=${address}&typeJobId=${typeJobId}&levelJobId=${levelJobId}&time=${time}`)
    },
    getRelativeJobs: async (TypeJobIdArray: number[]) => {
        return await axios.get(`${SERVER_BASE_URL}/get-job-by-type-job?type_job_id=${TypeJobIdArray.join(',')}`)
    },
    update: async (jobId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-job/${jobId}`, data)
    },
    createJob: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-job`, data)
    },
    createAddress: async (companyId: number, data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-address/${companyId}`, data)
    },
    deleteAddress: async (companyId: number, addressId: number) => {
        return await axios.delete(`${SERVER_BASE_URL}/delete-address?companyId=${companyId}&addressId=${addressId}`)
    },
}