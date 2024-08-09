import { combineReducers, configureStore } from '@reduxjs/toolkit'

import generalReducer from './reducers/general'
import blogReducer from './reducers/blog'
import contactReducer from './reducers/contact'
import freelancingReducer from './reducers/freelancing'
import projectReducer from './reducers/project'
import resumeReducer from './reducers/resume'
import serviceReducer from './reducers/service'
import skillReducer from './reducers/skill'
import testimonialReducer from './reducers/testimonial'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
    general: generalReducer,
    blog: blogReducer,
    contact: contactReducer,
    freelancing: freelancingReducer,
    project: projectReducer,
    resume: resumeReducer,
    service: serviceReducer,
    skill: skillReducer,
    testimonial: testimonialReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer
})