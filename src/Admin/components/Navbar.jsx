import { useStateContext } from '../../contexts/ContextProvider'
import { motion } from 'framer-motion'
import { Person, SwitchLeftOutlined, Dehaze } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = ({ navbarMenuRef, showMenu, setShowMenu }) => {
    const navigate = useNavigate()
    const { setMode, setShowSidebar } = useStateContext()
    const { loggedUser } = useSelector(state => state.user)

    const navigateToAccount = () => {
        navigate('/auth')
        setShowMenu(false)
    }

    const switchMode = () => {
        navigate('/')
        setShowMenu(false)
        localStorage.setItem('mode', 'user')
        setMode('user')
    }

    return (
        <div className="sticky top-0 flex justify-between h-[4rem] bg-darkGray w-full lg:px-[2rem] md:px-[1.5rem] px-[1rem] z-[100] " >

            <div className="flex items-center gap-[1rem] " >
                <button className="" onClick={() => setShowSidebar(pre => !pre)} ><Dehaze /></button>
                <h3 onClick={() => { navigate('/') }} style={{ fontFamily: 'cursive' }} className=" text-3xl font-bold cursor-pointer text-orange " >Nauman</h3>
            </div>

            <div className="flex items-center gap-[1rem] " >
                <p className="text-[24px] capitalize md:block sm:block hidden " >{loggedUser?.name}</p>
                <div className='relative ' >
                    <span onClick={() => setShowMenu(pre => !pre)} className="flex justify-center items-center bg-orange rounded-[50%] w-[40px] h-[40px] text-[24px] capitalize cursor-pointer " >{loggedUser?.name?.charAt(0) || 'U'}</span>
                    {
                        showMenu &&
                        <motion.div
                            ref={navbarMenuRef}
                            animate={{ x: [200, 0], opacity: [0, 1] }}
                            className="absolute top-[120%] right-[50%] border-[1px] border-white bg-lightGray p-[12px] gap-[8px] rounded-[4px] flex flex-col  " >
                            {/* <button onClick={navigateToAccount} className="flex gap-[8px] w-full min-w-max hover:bg-darkGray p-[6px] rounded-[4px] " ><Person className="" />Account</button> */}
                            <button onClick={switchMode} className="flex gap-[8px] w-full min-w-max hover:bg-darkGray p-[6px] rounded-[4px] " ><SwitchLeftOutlined className="" />Switch Mode</button>
                        </motion.div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar