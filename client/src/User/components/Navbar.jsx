import { useNavigate, useLocation } from "react-router-dom"
import { Close, Dehaze, Logout, Person, SwitchLeftOutlined } from "@mui/icons-material"
import { useDispatch } from 'react-redux'
import { IconButton } from "@mui/material"
import { Link } from "react-scroll"
import { useState } from "react"
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { logout } from '../../redux/actions/user'
import Button from './Button'
import { useStateContext } from "../../contexts/ContextProvider"

const Navbar = ({ navbarMenuRef, showMenu, setShowMenu }) => {


    const { setMode, initialUserState, initialErrorObj, setErrorObj } = useStateContext()
    ////////////////////////////// VARIABLES //////////////////////////////////////
    const { pathname } = useLocation()
    console.log(pathname)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedUser } = useSelector(state => state.user)
    const navLinks = [
        "home",
        "about",
        "services",
        "skills",
        "projects",
        "blogs",
        "testimonials",
        "contact",
    ]

    ////////////////////////////// STATES /////////////////////////////////////////
    const [showNavbar, setShowNavbar] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    // 1)
    const toggleShowNavbar = () => {
        setShowNavbar((prev) => !prev)
    }
    // 1)
    const toggleShowAccountMenu = () => {
        setShowAccountMenu((prev) => !prev)
    }
    // 2)
    const navigateToRegister = () => {
        navigate('/auth/register')
        setErrorObj(initialErrorObj)
    }
    // 3)
    const navigateToLogin = () => {
        navigate('/auth/login')
        setErrorObj(initialErrorObj)
    }
    // 4)
    const navigateToAccount = () => {
        navigate('/account');
        setShowMenu(false)
    }
    // 5)
    const switchMode = () => {
        setMode('admin');
        navigate('/');
        setShowMenu(false)
        localStorage.setItem('mode', 'admin')
    }
    // 6)
    const logoutFunc = () => {
        dispatch(logout(navigate))
        setShowMenu(false)
    }




    return (
        <>
            {/* desktop navbar */}
            <nav className="lg:flex lg:flex-col hidden justify-between min-h-[5rem] items-center bg-black text-white  " >
                <div className="w-full flex justify-between items-center py-[20px] px-[4rem] " >
                    <Link to="/" className="" >
                        <h3 style={{ fontFamily: 'cursive' }} className=" text-[40px] font-bold cursor-pointer text-orange " >Nauman</h3>
                    </Link>
                    {/* navLinks */}
                    {
                        pathname == '/' &&
                        <div className="flex justify-center items-center gap-[20px] " >
                            {
                                navLinks.map((link, index) => (
                                    <div key={index} className="flex flex-col justify-center items-center w-auto " >
                                        {console.log('this', link)}
                                        <Link
                                            id="link"
                                            to={`${link.toLowerCase()}`}
                                            activeClass="active"   //class applied when element is reached
                                            smooth={true}
                                            spy={true}
                                            offset={-100}
                                            duration={300}
                                            className="capitalize text-white cursor-pointer text-[20px] font-medium hover:text-[#938f8e] hover:scale-110 duration-500 "
                                        >
                                            {link}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {/* account/signup/login */}
                    <div className="flex justify-between  " >
                        {
                            loggedUser
                                ?
                                <div className="flex items-center gap-[1rem] " >
                                    <p className="text-[24px] capitalize " >{loggedUser?.name?.split(' ')[0]}</p>
                                    <div className="relative  " >
                                        <span onClick={() => { setShowMenu(pre => !pre); }} className="flex justify-center items-center bg-orange rounded-[50%] w-[40px] h-[40px] text-[24px] capitalize cursor-pointer " >{loggedUser?.name?.charAt(0)}</span>
                                        {
                                            showMenu &&
                                            <motion.div
                                                ref={navbarMenuRef}
                                                animate={{ x: [100, 0], opacity: [0, 1] }}
                                                className="absolute top-[120%] right-[50%] border-[1px] border-white bg-lightGray p-[12px] gap-[8px] rounded-[4px] flex flex-col  "
                                            >
                                                {loggedUser.role == 'admin' && <button onClick={switchMode} className="flex gap-[8px] w-full min-w-max hover:bg-darkGray p-[6px] rounded-[4px] " ><SwitchLeftOutlined className="" />Switch Mode</button>}
                                                <button onClick={logoutFunc} className="flex gap-[8px] w-full min-w-max hover:bg-darkGray p-[6px] rounded-[4px] " ><SwitchLeftOutlined className="" />Logout</button>
                                            </motion.div>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="flex gap-[1rem] " >
                                    <button onClick={navigateToLogin} className={`font-['PoppinsRegular'] bg-black text-white cursor-pointer border-white border-[1px] font-normal rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
                                        Login
                                    </button>
                                    <button onClick={navigateToRegister} className={`font-['PoppinsRegular'] bg-orange text-black cursor-pointer border-white border-[1px] font-semibold rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
                                        Register
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </nav>

















            {/* mobile navbar */}
            <div className="flex lg:hidden w-full bg-black flex-col items-end sticky top-0 left-0 z-50 px-[2rem] py-[12px] " >
                <div className="flex justify-between w-full items-center " >
                    <Link to="home" className="" >
                        <h3 onClick={() => navigate('/')} style={{ fontFamily: 'cursive' }} className=" text-3xl font-bold cursor-pointer text-orange " >Nauman</h3>
                    </Link>
                    <div className='flex ' >
                        <IconButton onClick={toggleShowNavbar} >
                            {
                                showNavbar
                                    ?
                                    <Close className="text-white text-4 " />
                                    :
                                    <Dehaze className="text-white text-4 " />}
                        </IconButton>
                    </div>
                </div>
                {
                    showNavbar &&
                    <motion.nav
                        animate={{ x: [200, 0], duration: '100' }}
                        className="absolute top-0 right-0 min-w-[16rem] pt-[1rem] h-screen flex flex-col justify-start w-fit gap-[2rem] items-start bg-lightGray text-white p-[1rem] rounded-[8px]"
                    >
                        <button className="w-full flex justify-end items-center relative top-[4px] right-[1rem] " onClick={toggleShowNavbar}  >
                            <Close className="text-white text-4 " />
                        </button>
                        {
                            pathname == '/' &&
                            <div className='flex flex-col justify-start gap-[1rem] w-full ' >
                                {
                                    navLinks.map((link, index) => (
                                        <div key={index} className="flex flex-col items-start justify-start w-full " >
                                            <Link
                                                id="link"
                                                to={link.link}
                                                activeClass="active"
                                                smooth={true}
                                                spy={true}
                                                offset={-100}
                                                duration={300}
                                                onClick={toggleShowNavbar}
                                                className="capitalize text-white cursor-pointer text-[20px] font-medium hover:text-[#938f8e] hover:scale-110 duration-500 "
                                            >
                                                {link}
                                            </Link>
                                        </div>))
                                }
                            </div>
                        }
                        <div className='flex flex-col gap-[1rem] ' >
                            {
                                loggedUser ?
                                    <>
                                        <button onClick={logoutFunc} className="flex gap-[8px] w-full min-w-max hover:bg-darkGray px-[4px] rounded-[4px] " ><Logout className="" />Logout</button>
                                    </>
                                    :
                                    <>
                                        <button onClick={navigateToLogin} className="cursor-pointer capitalize text-[20px] px-[20px] py-[4px] rounded-[8px] text-white border-[1px] border-white " >login</button>
                                        <button onClick={navigateToRegister} className="cursor-pointer capitalize text-[20px] px-[20px] py-[4px] rounded-[8px] bg-orange text-black border-[1px] border-white font-light " >Register</button>
                                    </>
                            }
                            <button onClick={() => { setMode('admin'); toggleShowNavbar() }} className="flex justify-start items-center gap-[8px] text-[1rem] px-[4px] hover:text-orange hover:scale-110 duration-500" >
                                <SwitchLeftOutlined className="" /><p>Switch Mode</p>
                            </button>
                        </div>
                    </motion.nav>
                }
            </div>


        </>
    )
}

export default Navbar