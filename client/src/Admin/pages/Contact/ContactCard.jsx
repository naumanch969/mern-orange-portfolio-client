import { Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState } from "react"
import { useDispatch } from "react-redux"
import TextareaAutosize from "react-textarea-autosize"
import { DropDown } from '../../components'
import { icons } from '../../../data'
import { updateContactCard, deleteContactCard } from '../../../store/actions/admin/contact'
import { useStateContext } from '../../../contexts/ContextProvider'


const ContactCard = ({ card }) => {
    const { contact, setContact } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    // const contactCard = contact?.cards.find(contactCard => contactCard._id == contactCard._id)
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showIconMenu, setShowIconMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateCardFunc = () => {
        setShowIconMenu(false)
        setContact({ ...contact })
        setOpenModal(false)
        dispatch(updateContactCard(card._id, card))
    }

    const deleteCardFunc = () => {
        contact.cards = contact.cards.filter(c => c._id !== card._id)
        setContact({ ...contact })
        dispatch(deleteContactCard(card._id))
    }

    const handleChange = (e) => {
        card[e.target.name] = e.target.value
        setContact({ ...contact })
    }


    return (
        <div className="relative flex flex-col gap-[6px] w-full h-full p-[8px] rounded-[4px] bg-darkGray ">

            <div onClick={() => setOpenModal(true)} className="relative flex flex-col gap-[6px] w-full h-full p-[8px] rounded-[4px] bg-darkGray ">

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Title:</h6>
                    <TextareaAutosize value={card.title} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Detail:</h6>
                    <TextareaAutosize value={card.detail} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Icon:</h6>
                    <TextareaAutosize value={card.icon} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

            </div>



            <Modal open={openModal} onClose={() => { setOpenModal(false); updateCardFunc() }}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Text :</h6>
                            <TextareaAutosize
                                type="text"
                                name="title"
                                autoComplete='off'
                                placeholder="Title...."
                                value={card?.title}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] w-[65%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Text :</h6>
                            <TextareaAutosize
                                type="text"
                                name="detail"
                                autoComplete='off'
                                placeholder="Detail...."
                                value={card?.detail}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] w-[65%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Icons :</h6>
                            <div className="relative lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] " >
                                <DropDown icons={icons} item={card} />
                            </div>
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteCardFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateCardFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default ContactCard;