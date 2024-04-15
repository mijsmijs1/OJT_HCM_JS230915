import axios from "axios"

const prefix = "candidate"
const version = "v1";

export const candidateApi = {
    decodeToken: async (token: string) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/decodeToken/${token}`)
    },
    register: async (candidate: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/auth/register`, candidate)
    },
    login: async (loginData: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/login`, loginData)
    },
    getData: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/get-data`, data)
    },
    findCandidateById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${id}`)
    },
    update: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${candidateId}`, data)
    }
}