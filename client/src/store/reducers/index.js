import aboutReducers from "./admin/about"
import blogsReducers from "./admin/blogs"
import contactReducers from "./admin/contact"
import footerReducers from "./admin/footer"
import freelancingReducers from "./admin/freelancing"
import homeReducers from "./admin/home"
import navbarReducers from "./admin/navbar"
import projectsReducers from "./admin/projects"
import resumesReducers from "./admin/resumes"
import servicesReducers from "./admin/services"
import skillsReducers from "./admin/skills"
import testimonialsReducers from "./admin/testimonials"


import userReducers from "./user/user"
import portfolioReducers from "./user/portfolio"


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

    people: userReducers,
    portfolio: portfolioReducers,

})