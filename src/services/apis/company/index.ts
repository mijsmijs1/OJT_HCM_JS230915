import axios from "axios"

const prefix = "company"
const version = "v1";

export const companyApi = {
    findCompanyById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${id}`)
    },
    update: async (companyId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${companyId}`, data)
    }
}