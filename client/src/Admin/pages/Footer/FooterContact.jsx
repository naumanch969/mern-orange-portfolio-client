import { Delete } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Modal } from '@mui/material'
import TextareaAutosize from "react-textarea-autosize"

import { DropDown } from '../../components'
import { icons } from '../../../data'
import { useStateContext } from "../../../contexts/ContextProvider"
import { updateContact, deleteContact } from '../../../store/actions/admin/footer'

const FooterContact = ({ contact }) => {
    const { footer, setFooter } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showIconMenu, setShowIconMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const updateContactFunc = () => {
        setShowIconMenu(false)
        dispatch(updateContact(contact._id, contact))
        setOpenModal(false)
    }
    // 2)
    const deleteContactFunc = () => {
        footer.contacts.contacts = footer.contacts.contacts.filter(c => c._id != contact._id)
        dispatch(deleteContact(contact._id))
        setFooter({ ...footer })
    }
    // 3)
    const handleChange = (e) => {
        contact[e.target.name] = e.target.value
        setFooter({ ...footer })
    }
    // 4)
    const toggleModal = () => {
        setOpenModal(true)
    }
    // 5)
    const closeModal = () => {
        setOpenModal(false);
        updateContactFunc();
    }


    return (
        <>
            <div onClick={toggleModal} className="relative flex flex-col justify-evenly gap-[6px] w-full h-full py-[8px] px-[1rem] rounded-[4px] bg-darkGray ">
                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Text:</h6>
                    <TextareaAutosize value={contact.text} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>
                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Icon:</h6>
                    <TextareaAutosize value={contact.icon} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>
            </div>


            <Modal open={openModal} onClose={closeModal}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Text :</h6>
                            <TextareaAutosize
                                type="text"
                                name="text"
                                autoComplete='off'
                                placeholder="Text...."
                                value={contact.text}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Icons :</h6>
                            <div className="relative lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%]" >
                                <DropDown icons={icons} item={contact} />
                            </div>
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteContactFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateContactFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FooterContact;

