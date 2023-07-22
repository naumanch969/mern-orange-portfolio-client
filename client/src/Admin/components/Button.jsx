import { Close } from "@mui/icons-material"
import { useState } from "react"
import { motion } from "framer-motion"
import { useStateContext } from "../../contexts/ContextProvider"
import { Modal } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from "react-redux"
import TextareaAutosize from "react-textarea-autosize"

const Button = ({ button, state, setState, deleteButton, updateButton }) => {

    const { user } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const isAdmin = user?.tokens?.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)
    const [showIconMenu, setShowIconMenu] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateButtonFunc = () => {
        dispatch(updateButton(button._id, button))
        setOpenModal(false)
    }

    const deleteButtonFunc = () => {
        if (!button._id) return null
        state.buttons = state.buttons.filter(b => b._id !== button._id)
        setState({ ...state })
        dispatch(deleteButton(button._id))
    }

    const handleChange = (e) => {
        button[e.target.name] = e.target.value
        setState({ ...state })
    }









    return (
        <>
            <div onClick={() => setOpenModal(true)} className="relative flex flex-col gap-[6px] w-full h-full p-[8px] rounded-[4px] bg-darkGray ">

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Text:</h6>
                    <TextareaAutosize value={button.text} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Variant:</h6>
                    <TextareaAutosize value={button.variant} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

            </div>











            <Modal open={openModal} onClose={() => { setOpenModal(false); updateButtonFunc() }}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Text :</h6>
                            <TextareaAutosize
                                type="text"
                                name="text"
                                autoComplete='off'
                                placeholder="Text...."
                                value={button.text}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Variant :</h6>
                            <div className="relative lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%]" >
                                <p onClick={() => setShowIconMenu(pre => !pre)} className=" text-textGray cursor-pointer " >{button?.variant || `email`}</p>
                                {
                                    showIconMenu &&
                                    <div className="  z-50 w-full p-[6px] rounded-[4px] gap-[8px] border-[1px] border-lightGray flex flex-col bg-textGray " >
                                        {
                                            variantArr.map((variant, index) => (
                                                <span
                                                    key={index}
                                                    onClick={() => { setShowIconMenu(false); button.variant = variant }}
                                                    className={`${button.variant == variant && 'bg-darkGray text-white '} w-full hover:bg-darkGray px-[6px] py-[4px] rounded-[2px] cursor-pointer `}
                                                >
                                                    {variant}
                                                </span>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteButtonFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateButtonFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}

export default Button;



const variantArr = [
    'contained',
    'outlined',
    'text'
]