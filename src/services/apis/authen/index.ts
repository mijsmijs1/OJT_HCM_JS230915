import axios from "axios"

const prefix = "auth"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const authenApi = {
    loginCandidate: async (candidateLoginData: any) => {
        return await axios.post(`${SERVER_BASE_URL}/login`, { ...candidateLoginData, role: 'candidate' })
    },
    loginCompany: async (companyLoginData: any) => {
        return await axios.post(`${SERVER_BASE_URL}/login`, { ...companyLoginData, role: 'company' })
    },
    registerCandidate: async (candidate: any) => {
        return await axios.post(`${SERVER_BASE_URL}/register`, candidate)
    },
    registerCompany: async (company: any) => {
        return await axios.post(`${SERVER_BASE_URL}/register`, company)
    },
    resetPassword: async (email: any) => {
        return await axios.post(`${SERVER_BASE_URL}/reset-password`, email)
    },
    changePassword: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/change-password`, data)
    },
    sendNewPassword: async () => {
        return await axios.get(`${SERVER_BASE_URL}/send-new-password`)
    },
    checkToken: async () => {
        return await axios.get(`${SERVER_BASE_URL}/check-token`,)
    },
    refreshToken: async (refreshToken: string) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/refresh-token`, { refreshToken: refreshToken })
    },
    logout: async (refreshToken: any) => {
        return await axios.get(`${SERVER_BASE_URL}/logout`, { ...refreshToken })
    },
    updateAccount: async (data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-candidate-account`, data)
    }
}