import { Clear, Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useStateContext } from "../../contexts/ContextProvider"

const ImageCard = ({ image, state, setState, deleteImage }) => {

    const { user } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const isAdmin = user?.tokens.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')
    const dispatch = useDispatch()
    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const deleteImageFunc = () => {
        dispatch(deleteImage(image._id))
        setState({ ...state, images: state.images.filter((img) => img._id !== image._id) })
    }




    return (
        <div
            onClick={() => setOpenModal(true)}
            className="relative flex flex-col gap-[6px] w-full p-[8px] rounded-[4px] bg-darkGray "
        >



            <img src={image.url} alt="image" className="w-full max-h-[20rem] " />
            <div className="flex flex-col" >
                <div className="flex " >
                    <h6 className="capitalize w-[25%] text-[10px] text-white " >name</h6>
                    <p className="text-[10px] w-[75%] text-textGray  " >{image.file.name}</p>
                </div>
                <div className="flex" >
                    <h6 className="capitalize w-[25%] text-[10px] text-white" >type</h6>
                    <p className="text-[10px] w-[75%] text-textGray  " >{image.file.type}</p>
                </div>
                <div className="flex" >
                    <h6 className="capitalize w-[25%] text-[10px] text-white" >size</h6>
                    <p className="text-[10px] w-[75%] text-textGray  " >{image.file.size}</p>
                </div>
                {/* <div className="flex " >
                    <h6 className="capitalize w-[25%] text-[10px] text-white" >url</h6>
                    <div className="w-full " >
                        <p className="text-[10px] w-[75%] text-textGray  " >{image.url}</p>
                    </div>
                </div> */}
            </div>



            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="relative p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <button className="absolute top-[4px] right-[4px] text-white " onClick={() => deleteImageFunc()}            >
                            <Clear />
                        </button>
                        <img src={image.url} alt="image" className="w-full max-h-[20rem] " />
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default ImageCard;