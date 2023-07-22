import aboutReducers from "./about"
import blogsReducers from "./blogs"
import contactReducers from "./contact"
import footerReducers from "./footer"
import freelancingReducers from "./freelancing"
import homeReducers from "./home"
import navbarReducers from "./navbar"
import projectsReducers from "./projects"
import resumesReducers from "./resumes"
import servicesReducers from "./services"
import skillsReducers from "./skills"
import testimonialsReducers from "./testimonials"

import { combineReducers } from "redux";

export default combineReducers({
    about: aboutReducers,
    blogs: blogsReducers,
    contact: contactReducers,
    footer: footerReducers,
    freelancing: freelancingReducers,
    home: homeReducers,
    navbar: navbarReducers,
    projects: projectsReducers,
    resumes: resumesReducers,
    services: servicesReducers,
    skills: skillsReducers,
    testimonials: testimonialsReducers,

})

