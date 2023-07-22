import { createContext, useContext, useState } from "react"
import Cookie from 'js-cookie'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var hour = ("0" + now.getHours()).slice(-2);
    var minute = ("0" + now.getMinutes()).slice(-2);
    var second = ("0" + now.getSeconds()).slice(-2);
    var formattedDateTime = day + "-" + month + "-" + year + ", " + hour + ":" + minute + ":" + second;


    const [mode, setMode] = useState(localStorage.getItem('mode') || 'user')
    const [showSidebar, setShowSidebar] = useState(true)
    const [activeNavLink, setActiveNavLink] = useState('overview')
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })


    // user
    const initialUserState = { name: '', email: '', phone: '', password: '', confirmPassword: '', registerOTP: '', forgetPasswordOTP: '' }
    const initialErrorObj = { login: '', register: '', sendRegisterOTP: '', sendForgetPasswordOTP: '', changePassword: '' }

    const [user, setUser] = useState(Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null)
    const [validationMessage, setValidationMessage] = useState(initialUserState)
    const [userFormData, setUserFormData] = useState(initialUserState)
    const [errorObj, setErrorObj] = useState(initialErrorObj)
    const [showPassword, setShowPassword] = useState(false)
    const [page, setPage] = useState('register')
    const initialPeopleState = { mainAdmin: {}, admins: [], users: [] }
    const [people, setPeople] = useState(initialPeopleState)


    const isMainAdmin = Boolean(user?.tokens?.find(token => token.name == ('main_admin_auth_token')))
    const isAdmin = Boolean(user?.tokens?.find(token => token.name == ('admin_auth_token')))
    const isAuthenticatedUser = Boolean(user?.tokens?.find(token => token.name == ('user_auth_token')))



    // about section
    const initialAboutState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        name: '',
        DOB: '',
        email: '',
        phone: '',
        address: '',
        subText: '',
        buttons: [],
        images: [],
    }
    const [about, setAbout] = useState(initialAboutState)






    // blogs section
    const initialBlogsState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        blogs: [],
    }
    const [blogs, setBlogs] = useState(initialBlogsState)






    // contact section
    const initialContactState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        cards: [], contactCardData: { icon: ``, title: ``, detail: `` },
        inputs: { name: ``, email: ``, subject: ``, message: `` },
        images: [],
        buttons: [],
    }
    const [contact, setContact] = useState(initialContactState)






    // footer section
    const initialFooterState = {
        about: { title: ``, detail: `` },
        services: { title: ``, services: [] },
        links: { title: ``, links: [] },
        contacts: { title: ``, contacts: [] },
        copyrightText: ``
    }

    const [footer, setFooter] = useState(initialFooterState)






    // freelancing section
    const initialFreelancingState = {
        heading: '',
        detail: '',
        featureCards: [],
        freelancingCards: [],
        buttons: [],
    }
    const [freelancing, setFreelancing] = useState(initialFreelancingState)






    // home section
    const initialHomeState = {
        helloText: '',
        heading1: '',
        heading2: '',
        subHeading1: '',
        buttons: [],
        images: [],

    }
    const [home, setHome] = useState(initialHomeState)






    // navbar section
    const initialNavbarState = {
        logo: { logoText: '', logoImage: {} },
        navLinks: [],
        socialMedia: [],
    }
    const [navbar, setNavbar] = useState(initialNavbarState)














    // projects section
    const initialProjectsState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        projects: [],
        buttons: [],
    }
    const [projects, setProjects] = useState(initialProjectsState)








    // resumes section
    const initialResumesState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        buttons: [],
        resumes: [],
    }
    const [resumes, setResumes] = useState(initialResumesState)






    // services section
    const initialServicesState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        services: [],
        buttons: [],
    }
    const [services, setServices] = useState(initialServicesState)





    // skills section
    const initialSkillsState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        skills: []
    }
    const [skills, setSkills] = useState(initialSkillsState)







    // testimonials section
    const initialTestimonialsState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        testimonials: [],
    }
    const [testimonials, setTestimonials] = useState(initialTestimonialsState)








    // overview section
    const initialOverviewState = {
        forwardHeading: '',
        backHeading: '',
        detail: '',
        name: '',
        DOB: '',
        email: '',
        phone: '',
        address: '',
        subText: '',
        buttons: [],
    }
    const [overview, setOverview] = useState(initialOverviewState)


    return (
        <StateContext.Provider
            value={{
                formattedDateTime,

                isMainAdmin,
                isAdmin,
                isAuthenticatedUser,

                mode, setMode,
                showSidebar, setShowSidebar,
                activeNavLink, setActiveNavLink,
                windowSize, setWindowSize,

                initialAboutState, about, setAbout,
                initialBlogsState, blogs, setBlogs,
                initialContactState, contact, setContact,
                initialFooterState, footer, setFooter,
                initialFreelancingState, freelancing, setFreelancing,
                initialHomeState, home, setHome,
                initialNavbarState, navbar, setNavbar,
                initialPeopleState, people, setPeople,
                initialProjectsState, projects, setProjects,
                initialResumesState, resumes, setResumes,
                initialServicesState, services, setServices,
                initialSkillsState, skills, setSkills,
                initialTestimonialsState, testimonials, setTestimonials,

                overview, setOverview,
                initialUserState, userFormData, setUserFormData,
                initialErrorObj, errorObj, setErrorObj,
                validationMessage, setValidationMessage,
                user, setUser,
                page, setPage,
                showPassword, setShowPassword,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)