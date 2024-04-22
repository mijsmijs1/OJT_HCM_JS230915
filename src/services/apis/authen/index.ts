import axios from "axios"

const prefix = "auth"
const version = "v1";

export const authenApi = {
    loginCandidate: async (candidateLoginData: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/login`, { ...candidateLoginData, role: 'candidate' })
    },
    loginCompany: async (companyLoginData: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/login`, { ...companyLoginData, role: 'company' })
    },
    registerCandidate: async (candidate: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/register`, candidate)
    },
    registerCompany: async (company: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/register`, company)
    },
    resetPassword: async (email: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/reset-password`, email)
    },
    changePassword: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/change-password`, data)
    },
    sendNewPassword: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/send-new-password`)
    },
    checkToken: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/check-token`,)
    },
    refreshToken: async (refreshToken: any) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/refresh-token`, { ...refreshToken })
    },
    logout: async (refreshToken: any) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/logout`, { ...refreshToken })
    },
    updateAccount: async (data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-candidate-account`, data)
    },
}