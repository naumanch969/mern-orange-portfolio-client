import { Delete } from "@mui/icons-material"
import { useState } from "react"
import { Modal } from '@mui/material'
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { updateLink, deleteLink } from '../../../store/actions/admin/footer'
import TextareaAutosize from "react-textarea-autosize"


const FooterLink = ({ link }) => {
    const { footer, setFooter } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const updateLinkFunc = (name) => {
        dispatch(updateLink(link._id, link))
        setOpenModal(false)
    }
    // 2)
    const deleteLinkFunc = () => {
        footer.links.links = footer.links.links.filter(l => l._id != link._id)
        dispatch(deleteLink(link._id))
        setFooter({ ...footer })
    }
    // 3)
    const handleChage = (e) => {
        link[e.target.name] = e.target.value
        setFooter({ ...footer })
    }
    // 4)
    const toggleModal = () => {
        updateLinkFunc();
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false)
    }


    return (
        <>
            <div onClick={toggleModal} className="cursor-pointer relative flex flex-col justify-evenly gap-[6px] w-full h-full py-[8px] px-[1rem] rounded-[4px] bg-darkGray ">

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Name:</h6>
                    <TextareaAutosize value={link.name} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Link:</h6>
                    <TextareaAutosize value={link.link} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

            </div>

            <Modal open={openModal} onClose={closeModal}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Text :</h6>
                            <TextareaAutosize
                                type="text"
                                name="name"
                                autoComplete='off'
                                placeholder="Name...."
                                value={link.name}
                                onChange={handleChage}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Icons :</h6>
                            <TextareaAutosize
                                type="text"
                                name="link"
                                placeholder="Link...."
                                autoComplete='off'
                                value={link.link}
                                onChange={handleChage}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteLinkFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateLinkFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FooterLink;