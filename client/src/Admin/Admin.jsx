import { Routes, Route, Navigate } from "react-router-dom"
import { Sidebar, Navbar } from "./components"
import "react-datetime/css/react-datetime.css";
import { Overview, Navbar as NavbarPage, Home, About, Resumes, Services, Skills, Projects, Blogs, Testimonials, Freelancing, Contact, Footer, } from "./pages"
import { useStateContext } from '../contexts/ContextProvider'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const Admin = () => {

    const navbarMenuRef = useRef(null)
    const { showSidebar, setShowSidebar, windowSize, setWindowSize } = useStateContext()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (windowSize.width < 786) {
            setShowSidebar(false)
        }
    }, [windowSize])


    const pageClick = (event) => {
        if (navbarMenuRef.current && !navbarMenuRef.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    return (
        <div onClick={pageClick} className="bg-black text-white h-full flex flex-col  " >

            <Navbar navbarMenuRef={navbarMenuRef} showMenu={showMenu} setShowMenu={setShowMenu} />

            <div className="flex z-50 " >
                {
                    showSidebar &&
                    <motion.div
                        animate={{ x: [-300, 0] }}
                        className={`lg:w-[20%] md:w-[25%] `} >
                        <Sidebar />
                    </motion.div>
                }
                <div style={{ minHeight: `calc(100vh - 4rem)` }} className={`py-[1rem] px-[2rem] pb-[5rem] z-40 ${showSidebar ? 'lg:w-[80%] md:w-[75%] sm:w-full w-full' : 'w-full'} `} >
                    <Routes>
                        <Route path="/" element={<Navigate replace to="overview" />} />
                        <Route path="/overview" element={<Overview />} />
                        <Route path="/navbar" element={<NavbarPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/resumes" element={<Resumes />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/freelancing" element={<Freelancing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/footer" element={<Footer />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
};

export default Admin;
