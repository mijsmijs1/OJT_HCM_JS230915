import axios from "axios"

const prefix = "company"
const version = "v1";

export const companyApi = {
    decodeToken: async (token: string) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/decodeToken/${token}`)
    },
    findCompanyById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${id}`)
    },
    findAllCompany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/get-all`)
    },
    update: async (companyId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${companyId}`, data)
    }
}