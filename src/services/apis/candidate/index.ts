import axios from "axios"

const prefix = "candidate"
const version = "v1";
const SERVER_BASE_URL = `${import.meta.env.VITE_SERVER}/api/${version}/${prefix}`

export const candidateApi = {
    findCandidateById: async (id: number) => {
        return await axios.get(`${SERVER_BASE_URL}/${id}`)
    },
    getCertificate: async () => {
        return await axios.get(`${SERVER_BASE_URL}/certificate`)
    },
    getEducation: async () => {
        return await axios.get(`${SERVER_BASE_URL}/education`)
    },
    findEucationById:async (candidateId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/education/${candidateId}`)
    },
    findExperienceById:async (candidateId: number) => {
        return await axios.get(`${SERVER_BASE_URL}/experience/${candidateId}`)
    },
    getExperience: async () => {
        return await axios.get(`${SERVER_BASE_URL}/experience`)
    },
    getSkill: async () => {
        return await axios.get(`${SERVER_BASE_URL}/skill`)
    },
    getProject: async () => {
        return await axios.get(`${SERVER_BASE_URL}/project`)
    },
    createCertificate: async (certificate: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-certificate`, certificate)
    },
    createEducation: async (education: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-education`, education)
    },
    createExperience: async (experience: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-experience`, experience)
    },
    createProject: async (project: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-project`, project)
    },
    createSkill: async (skills: any) => {
        return await axios.post(`${SERVER_BASE_URL}/create-skill`, skills)
    },
    updateCertificate: async (candidateId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-certificate/${candidateId}`, data)
    },
    updateEducation: async (candidateId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-education/${candidateId}`, data)
    },
    deleteEducation:  async (candidateId: number) => {
        return await axios.delete(`${SERVER_BASE_URL}/delete-education/${candidateId}`)
    },
    updateExperience: async (candidateId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-experience/${candidateId}`, data)
    },
    updateProject: async (candidateId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-project/${candidateId}`, data)
    },
    updateSkill: async (candidateId: number, data: any) => {
        return await axios.patch(`${SERVER_BASE_URL}/update-skill/${candidateId}`, data)
    }
}