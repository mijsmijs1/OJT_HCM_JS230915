import axios from "axios"

const prefix = "candidate"
const version = "v1";

export const candidateApi = {
    findCandidateById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/${id}`)
    },
    getCertificate: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/certificate`)
    },
    getEducation: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/education`)
    },
    getExperience: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/experience`)
    },
    getSkill: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/skill`)
    },
    getProject: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/project`)
    },
    createCertificate: async (certificate: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/create-certificate`, certificate)
    },
    createEducation: async (education: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/create-education`, education)
    },
    createExperience: async (experience: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/create-experience`, experience)
    },
    createProject: async (project: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/create-project`, project)
    },
    createSkill: async (skills: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/create-skill`, skills)
    },
    updateCertificate: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-certificate/${candidateId}`, data)
    },
    updateEducation: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-education/${candidateId}`, data)
    },
    updateExperience: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-experience/${candidateId}`, data)
    },
    updateProject: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-project/${candidateId}`, data)
    },
    updateSkill: async (candidateId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER}/api/${version}/${prefix}/update-skill/${candidateId}`, data)
    }
}