import axios from 'axios'
import Cookie from 'js-cookie'
import { BASE_URL } from '../../constants/admin'

const API = axios.create({ baseURL: BASE_URL })
API.interceptors.request.use((req) => {
    if (Cookie.get('profile')) {
        const result = JSON.parse(Cookie.get('profile'))
        const { tokens } = result
        tokens.map(token => {
            req.headers[token.name] = token.token
        })
    }
    return req
})


// skills
export const getSkillsContent = () => { return API.get(`/portfolio/skills/get`) }
export const createSkillsFirstDocument = () => { return API.post(`/portfolio/skills/create`) }

export const updateForwardHeading = (forwardHeading) => { return API.put(`/portfolio/skills/update-forward-heading`, { forwardHeading }) }
export const updateBackHeading = (backHeading) => { return API.put(`/portfolio/skills/update-back-heading`, { backHeading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/skills/update-detail`, { detail }) }

export const addSkill = (skill, percentage) => { return API.put(`/portfolio/skills/add-skill`, { skill, percentage }) }             //{skill, percentage}
export const updateSkill = (skillId, skill) => { return API.put(`/portfolio/skills/update-skill/${skillId}`, skill) }
export const deleteSkill = (skillId) => { return API.put(`/portfolio/skills/delete-skill/${skillId}`,) }

export const deleteSkillsCollection = () => { return API.delete(`/portfolio/skills/delete-skills-collection`) }