import { useState, useEffect, useRef } from "react"
import { IconButton, Tooltip } from "@mui/material"
import { Dehaze, Close } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion'
import { Drawer } from '@mui/material'

import { Link } from "react-router-dom"

import { useStateContext } from "../../contexts/ContextProvider"




const Sidebar = () => {


    const { showSidebar, activeNavLink, setActiveNavLink, setShowSidebar } = useStateContext()
    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const sidebarArr = [
        'resumes',
        'services',
        'skills',
        'projects',
        'blogs',
        'freelancing',
        'testimonials',
        'contact',
    ]

    ////////////////////////////// STATES /////////////////////////////////////////
    const [showScrollbar, setShowScrollbar] = useState(0)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    useEffect(() => {
        setActiveNavLink(window.location.pathname.split("/")[1])
    }, [])


    return (
        <>
            <div
                onMouseEnter={() => setShowScrollbar(true)}
                onMouseLeave={() => setShowScrollbar(false)}
                style={{ height: 'calc(100vh - 4rem)' }}
                className={` bg-darkGray w-full sticky top-[4rem] md:flex hidden `}
            >
                <div className={` ${!showSidebar && 'hidden  '} overflow-y-scroll ${showScrollbar ? 'overflow-y-scroll overflow-x-hidden ' : 'overflow-hidden'} flex flex-col gap-[8px] py-[1rem] bg-darkGray w-full h-full`}            >
                    {
                        sidebarArr.map((item, index) => (

                            <Link
                                key={index}
                                to={`/${item}`}
                                onClick={() => setActiveNavLink(item)}
                                className={`${activeNavLink == item && 'border-[1px] border-orange text-orange '} capitalize mx-[16px] rounded-[4px] bg-lightGray cursor-pointer `}
                            >
                                <motion.li whileInView={{ opacity: [0, 1] }} className="w-full h-full py-[8px] px-[10px] " >
                                    {item}
                                </motion.li>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="" >
                <div
                    onMouseEnter={() => setShowScrollbar(true)}
                    onMouseLeave={() => setShowScrollbar(false)}
                    style={{ height: 'calc(100vh - 4rem)' }}
                    className={` bg-darkGray md:hidden flex fixed w-[15rem] z-50 `}
                >
                    <div className={` ${!showSidebar && 'hidden  '} ${showScrollbar ? 'overflow-y-scroll overflow-x-hidden ' : 'overflow-hidden'} flex flex-col gap-[8px] py-[1rem] bg-darkGray w-full h-full`}            >
                        {
                            sidebarArr.map((item, index) => (
                                <Link
                                    key={index}
                                    to={`/${item}`}
                                    onClick={() => { setActiveNavLink(item); setShowSidebar(false) }}
                                    className={`${activeNavLink == item && 'border-[1px] border-orange text-orange '} py-[8px] px-[10px] capitalize mx-[16px] rounded-[4px] bg-lightGray cursor-pointer `}
                                >
                                    {item}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}


export default Sidebar
