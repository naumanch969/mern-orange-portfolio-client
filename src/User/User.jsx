// for top horizontal scroll bar
import { motion, useScroll, useSpring } from "framer-motion";
// import { useFollowPointer } from "./utils/pointer";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar, NavigationDots, SocialLinks } from "./components"
import { Home, About, Resume, Services, Skills, Projects, Blogs, Freelancing, Testimonials, Contact, Footer, Account, Register, Login } from "./pages"
import 'react-phone-number-input/style.css'
 
const User = () => {

    ////////////////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()
    const navbarMenuRef = useRef(null)

    ////////////////////////////////////// STATES //////////////////////////////////////
    const [showMenu, setShowMenu] = useState(false)

    ////////////////////////////////////// USE EFFECTS /////////////////////////////////
    useEffect(() => {

    }, [])

    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////
    const pageClick = () => {
        if (navbarMenuRef.current && !navbarMenuRef.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    // for top horizontal scroll bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
 

    const App = () => (
        <div onClick={pageClick} className="flex justify-between  " >
            <div style={{ height: 'calc(100vh - 4rem)' }} className="md:flex hidden sticky top-[4rem] z-50 justify-end flex-col w-[5vw] items-center p-4 gap-4">
                <SocialLinks />
            </div>
            <div className="md:w-[90vw] w-screen sm:px-[1rem] lg:px-[5rem] md:px-[2rem]  " >
                <Home />
                <About />
                {/* <Resume /> */}
                <Services />
                <Skills />
                <Projects />
                <Blogs />
                <Testimonials />
                <Freelancing />
                <Contact />
                <Footer />
            </div>
            <div style={{ height: 'calc(100vh - 4rem)' }} className="md:flex hidden sticky top-[4rem] z-50 justify-center flex-col w-[5vw] items-center p-4 gap-4">
                <NavigationDots />
            </div>
        </div>
    )


    return (
        <div className="bg-black w-full h-full " >

            <motion.div className="progress-bar" style={{ scaleX }} />


            <Navbar navbarMenuRef={navbarMenuRef} showMenu={showMenu} setShowMenu={setShowMenu} />
            <div style={{minHeight:'calc(100vh - 4rem)'}} className="flex justify-center items-center " >
                <Routes>
                    <Route exact path='/auth/register' element={<Register />} />
                    <Route exact path='/auth/login' element={<Login />} />
                    <Route exact path='/account' element={<Account />} />
                    <Route path='/' element={<App />} />
                    <Route path='/*' element={<Navigate replace to='/' />} />
                </Routes>
            </div>

        </div>
    );
};

export default User;