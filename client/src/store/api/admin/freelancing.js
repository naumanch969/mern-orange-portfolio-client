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




// freelancing
export const getFreelancingContent = () => { return API.get(`/portfolio/freelancing/get`) }
export const createFreelancingFirstDocument = () => { return API.post(`/portfolio/freelancing/create`) }


export const updateHeading = (heading) => { return API.put(`/portfolio/freelancing/update-heading`, { heading }) }
export const updateDetail = (detail) => { return API.put(`/portfolio/freelancing/update-detail`, { detail }) }

export const addFeatureCard = (title, quantity) => { return API.put(`/portfolio/freelancing/add-feature-card`, { title, quantity }) }               // { title, quantity }
export const updateFeatureCard = (featureCardId, card) => { return API.put(`/portfolio/freelancing/update-feature-card/${featureCardId}`, card) }
export const deleteFeatureCard = (featureCardId) => { return API.put(`/portfolio/freelancing/delete-feature-card/${featureCardId}`) }

export const addFreelancingCard = (title, cards, detail) => { return API.put(`/portfolio/freelancing/add-freelancing-card`, { title, cards, detail }) }
export const updateFreelancingCardTitle = (freelancingCardId, title) => { return API.put(`/portfolio/freelancing/freelancing-card/update-title/${freelancingCardId}`, { title }) }
export const updateFreelancingCardDetail = (freelancingCardId, detail) => { return API.put(`/portfolio/freelancing/freelancing-card/update-detail/${freelancingCardId}`, { detail }) }
export const deleteFreelancingCard = (freelancingCardId) => { return API.put(`/portfolio/freelancing/delete-freelancing-card/${freelancingCardId}`) }

export const addSubFreelancingCard = (freelancingCardId, freelancingSubCardData) => { return API.put(`/portfolio/freelancing/freelancing-card/add-sub-card/${freelancingCardId}`, freelancingSubCardData) }          //{title, link, description, category, images }
export const updateSubFreelancingCard = (freelancingCardId, subCardId, freelancingSubCardData) => { return API.put(`/portfolio/freelancing/freelancing-card/update-sub-card/${freelancingCardId}`, { ...freelancingSubCardData, subCardId }) }                    //{subCardId, title, link, description, category, images }
export const deleteSubFreelancingCard = (freelancingCardId, subCardId) => { return API.put(`/portfolio/freelancing/freelancing-card/delete-sub-card/${freelancingCardId}`, { subCardId }) }

export const addButton = (text, variant) => { return API.put(`/portfolio/freelancing/add-button`, { text, variant }) }
export const updateButton = (buttonId, button) => { return API.put(`/portfolio/freelancing/update-button/${buttonId}`, button) }
export const deleteButton = (buttonId) => { return API.put(`/portfolio/freelancing/delete-button/${buttonId}`) }


export const deleteFreelancingCollection = () => { return API.delete(`/portfolio/freelancing/delete-freelancing-collection`) }