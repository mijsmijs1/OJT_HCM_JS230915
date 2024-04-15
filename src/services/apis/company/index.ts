import axios from "axios"

const prefix = "company"
const version = "v1";

export const companyApi = {
    decodeToken: async (token: string) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/decodeToken/${token}`)
    },
    register: async (company: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/auth/register`, company)
    },
    login: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/login`, data)
    },
    getData: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/get-data`, data)
    },
    findCompanyById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${id}`)
    },
    update: async (companyId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${companyId}`, data)
    }
}