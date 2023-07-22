// for top horizontal scroll bar
import { motion, useScroll, useSpring } from "framer-motion";
// import { useFollowPointer } from "./utils/pointer";
import { getPortfolioContent } from '../store/actions/user/portfolio'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar, NavigationDots, SocialLinks } from "./components"
import { Home, About, Resume, Services, Skills, Projects, Blogs, Freelancing, Testimonials, Contact, Footer, Auth, Account } from "./pages"
import 'react-phone-number-input/style.css'
import { Loading } from '../utils/Components'
import { useLocation } from 'react-router-dom'
// import { result } from '../data'

const User = () => {
    const dispatch = useDispatch()
    const { result, isLoading, isError, fetchingPortfolioContent } = useSelector(state => state.portfolio)

    const navbarMenuRef = useRef(null)
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation()

    useEffect(() => {
        dispatch(getPortfolioContent())
    }, [])

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
    // for scrolling ball
    // const ref = useRef(null);
    // const { x, y } = useFollowPointer(ref);

    if (isLoading && fetchingPortfolioContent) return <div className="min-h-screen flex justify-center items-center "  >
        <Loading />
    </div>

    const App = () => (
        <div onClick={pageClick} className="flex justify-between  " >
            <div style={{ height: 'calc(100vh - 4rem)' }} className="md:flex hidden sticky top-[4rem] z-50 justify-end flex-col w-[5vw] items-center p-4 gap-4">
                <SocialLinks content={result?.navbar} />
            </div>
            <div className="  md:w-[90vw] w-screen sm:px-[1rem] lg:px-[5rem] md:px-[2rem]  " >
                <Home content={result?.home} />
                <About content={result?.about} />
                <Resume content={result?.resumes} />
                <Services content={result?.services} />
                <Skills content={result?.skills} />
                <Projects content={result?.projects} />
                <Blogs content={result?.blogs} />
                <Testimonials content={result?.testimonials} />
                <Freelancing content={result?.freelancing} />
                <Contact content={result?.contact} />
                <Footer content={result?.footer} />
            </div>
            <div style={{ height: 'calc(100vh - 4rem)' }} className="md:flex hidden sticky top-[4rem] z-50 justify-center flex-col w-[5vw] items-center p-4 gap-4">
                <NavigationDots />
            </div>
        </div>)


    return (
        <div className="bg-black " >

            {/* progress bar */}
            <motion.div className="progress-bar" style={{ scaleX }} />
            {/* scrolling ball */}
            {/* <motion.div ref={ref} className="box md:block hidden " animate={{ x, y }} transition={{ type: "spring", damping: 3, stiffness: 50, restDelta: 0.001 }} /> */}


            <Navbar content={result?.navbar} navbarMenuRef={navbarMenuRef} showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className="min-h-screen flex justify-center items-center " >
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/' element={<App />} />
                    <Route path='/overview' element={<Navigate replace to='/' />} />
                </Routes>
            </div>

        </div>
    );
};

export default User;