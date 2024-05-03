import axios from "axios"

const prefix = "job"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const jobApi = {
    getTypeJob: async () => {
        return await axios.get(`${SERVER_BASE_URL}/type-job`)
    },
    getLevelJob: async () => {
        return await axios.get(`${SERVER_BASE_URL}/level-job`)
    },
    update: async (companyId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-company/${companyId}`, data)
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