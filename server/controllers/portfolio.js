import User from "../models/user.js";
import Navbar from "../models/navbar.js";
import Home from "../models/home.js";
import About from "../models/about.js";
import Resumes from "../models/resumes.js";
import Services from "../models/services.js";
import Skills from "../models/skills.js";
import Projects from "../models/projects.js";
import Blogs from "../models/blogs.js";
import Testimonials from "../models/testimonials.js";
import Freelancing from "../models/freelancing.js";
import Contact from "../models/contact.js";
import Footer from "../models/footer.js";



export const getPortfolioContent = async (req, res) => {
    try {
        const userArr = await User.find()
        const navbarArr = await Navbar.find()
        const homeArr = await Home.find()
        const aboutArr = await About.find()
        const resumesArr = await Resumes.find()
        const servicesArr = await Services.find()
        const skillsArr = await Skills.find()
        const projectsArr = await Projects.find()
        const blogsArr = await Blogs.find()
        const testimonialsArr = await Testimonials.find()
        const freelancingArr = await Freelancing.find()
        const contactArr = await Contact.find()
        const footerArr = await Footer.find()

        const userObj = userArr[0]
        const navbarObj = navbarArr[0]
        const homeObj = homeArr[0]
        const aboutObj = aboutArr[0]
        const resumesObj = resumesArr[0]
        const servicesObj = servicesArr[0]
        const skillsObj = skillsArr[0]
        const projectsObj = projectsArr[0]
        const blogsObj = blogsArr[0]
        const testimonialsObj = testimonialsArr[0]
        const freelancingObj = freelancingArr[0]
        const contactObj = contactArr[0]
        const footerObj = footerArr[0]




        const result = {
            user: userObj,
            navbar: navbarObj,
            home: homeObj,
            about: aboutObj,
            resumes: resumesObj,
            services: servicesObj,
            skills: skillsObj,
            projects: projectsObj,
            blogs: blogsObj,
            testimonials: testimonialsObj,
            freelancing: freelancingObj,
            contact: contactObj,
            footer: footerObj
        }
        res.status(200).json({ result, message: 'portfolio content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getPortfolioContent - navbar.js - controllers', error })
    }
}