import axios from "axios"

const prefix = "company"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const companyApi = {
    checkCompany: async (companyId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/check-company/${companyId}`)
    },
    findCompanyById: async (id: number) => {
        return await axios.get(`${SERVER_BASE_URL}/${id}`)
    },
    findAllCompany: async () => {
        return await axios.get(`${SERVER_BASE_URL}/get-all`)
    },
    search: async (page: number, pageSize: number = 10, keyword: string = 'all', address: string = 'all') => {
        return await axios.get(`${SERVER_BASE_URL}/search?page=${page}&pageSize=${pageSize}&keyword=${keyword}&address=${address}`)
    },
    findCompanyByType: async (typeId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/get-company-by-type/${typeId}`)
    },
    register: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/register`, data);
    },
    update: async (companyId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-company/${companyId}`, data)
    },
    updateAddess: async (companyId: number, addressId: number, updateAdressData: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-address?companyId=${companyId}&addressId=${addressId}`, updateAdressData)
    },
    getTypeCompany: async () => {
        return await axios.get(`${SERVER_BASE_URL}/get-type-company`)
    },
    getAddressById: async (companyId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/get-address-by-id/${companyId}`)
    },
    createCompany: async (data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-company`, data)
    },
    createAddress: async (companyId: number, data: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-address/${companyId}`, data)
    },
    deleteAddress: async (companyId: number, addressId: number) => {
        return await axios.delete(`${SERVER_BASE_URL}/delete-address?companyId=${companyId}&addressId=${addressId}`)
    },
}