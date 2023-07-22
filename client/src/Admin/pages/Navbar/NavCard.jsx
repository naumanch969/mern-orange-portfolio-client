import { Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState } from "react"
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import TextareaAutosize from "react-textarea-autosize"

const NavCard = ({ navItem, deleteNavItem, updateNavItem, attribute }) => {

    const { navbar, setNavbar } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const findedNavItem = navbar[attribute].find(item => item._id == navItem._id)
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const updateNavItemFunc = () => {
        dispatch(updateNavItem(navItem._id, findedNavItem))
        setNavbar({ ...navbar })
        setOpenModal(false)
    }
    // 2)
    const deleteNavItemFunc = () => {
        navbar[attribute] = navbar[attribute].filter(item => item._id !== navItem._id)
        dispatch(deleteNavItem(navItem._id))
        setNavbar({ ...navbar })
        setOpenModal(false)
    }
    // 3)
    const handleChange = (e) => {
        findedNavItem[e.target.name] = e.target.value
        setNavbar({ ...navbar })
    }
    // 4)
    const toggleModal = () => {
        setOpenModal(true)
    }
    // 5)
    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <>
            <div onClick={toggleModal} className="relative flex flex-col gap-[6px] w-full h-full p-[8px] rounded-[4px] bg-darkGray "            >

                <div className="flex " >
                    <h6 className="capitalize text-[16px] w-[35%] text-white " >Name</h6>
                    <p className='text-[18px] w-[65%] text-textGray'>{navItem?.name}</p>
                </div>

                <div className="flex " >
                    <h6 className="capitalize text-[16px] w-[35%] text-white " >Link</h6>
                    <TextareaAutosize value={navItem?.link} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] w-[65%] text-textGray' />
                </div>

            </div>



            <Modal open={openModal} onClose={closeModal}>
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        {/* name */}
                        <div className="flex" >
                            <h6 className="capitalize text-[16px] w-[35%] text-white " >Name</h6>
                            <TextareaAutosize
                                type="text"
                                name="name"
                                autoComplete='off'
                                placeholder="Type Here"
                                value={navItem?.name}
                                onChange={handleChange}
                                className={`resize-none border-none bg-inherit outline-none text-[18px] w-[65%] text-textGray `}
                            />
                        </div>
                        {/* link */}
                        <div className="flex" >
                            <h6 className="capitalize text-[16px] w-[35%] text-white " >Link</h6>
                            <TextareaAutosize
                                type="text"
                                name="link"
                                autoComplete='off'
                                placeholder="Link"
                                value={navItem?.link}
                                onChange={handleChange}
                                className={`resize-none border-none bg-inherit outline-none text-[18px] w-[65%] text-textGray `}
                            />
                        </div>
                        {/* buttons - delete,update */}
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteNavItemFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateNavItemFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default NavCard;



const variantArr = [
    'contained',
    'outlined',
    'text'
]