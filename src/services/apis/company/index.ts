import axios from "axios"

const prefix = "company"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const companyApi = {
    findCompanyById: async (id: number) => {
        return await axios.get(`${SERVER_BASE_URL}/${id}`)
    },
    register: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/register`, data);
    },
    createCompany: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-company`, data)
    },
    createAddress: async ( companyId: number, data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-address/${companyId}`, data)
    },
}