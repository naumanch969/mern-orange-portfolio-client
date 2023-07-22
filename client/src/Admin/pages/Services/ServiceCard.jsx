import { Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useDispatch } from "react-redux"

import { updateService, deleteService } from '../../../store/actions/admin/services'
import { DropDown } from '../../components'
import { icons } from '../../../data'
import { useStateContext } from "../../../contexts/ContextProvider"


const ServiceCard = ({ service }) => {

    const { services, setServices } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showIconMenu, setShowIconMenu] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [iconValue, setIconValue] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)   -   CRUD
    const updateServiceFunc = () => {
        dispatch(updateService(service._id, service))
        setServices({ ...services })
        setOpenModal(false)
    }
    // 2)
    const deleteServiceFunc = () => {
        dispatch(deleteService(service._id))
        setServices({ ...services, services: services.services.filter((s) => s._id !== service._id) })
        setOpenModal(false)
    }
    // 3)   -   input changes
    const handleChange = (e) => {
        service[e.target.name] = e.target.value
        setServices({ ...services })
    }
    // 4)   -   modal
    const toggleModal = () => {
        setOpenModal(true)
    }
    // 5)
    const closeModal = () => {
        setOpenModal(false)
    }


    return (
        <>
            <div onClick={toggleModal} className="flex flex-col justify-evenly gap-[8px] cursor-pointer relative py-[8px] px-[1rem] rounded-[4px] bg-darkGray w-full h-full ">

                {/* service */}
                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Service:</h6>
                    <TextareaAutosize value={service.service} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>
                {/* link */}
                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Link:</h6>
                    <TextareaAutosize value={service.link} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>
                {/* icon */}
                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Icon:</h6>
                    <TextareaAutosize value={service.icon} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

            </div>






            <Modal open={openModal} onClose={() => { setOpenModal(false); updateCardFunc() }}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        {/* service */}
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>service :</h6>
                            <TextareaAutosize
                                minRows={1}
                                maxRows={12}
                                type='text'
                                autoComplete='off'
                                placeholder='Service'
                                value={service.service}
                                name='service'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        {/* link */}
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>link :</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Link'
                                value={service.link}
                                name='link'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        {/* icons */}
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Icons :</h6>
                            <div className="relative lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] " >
                                <DropDown icons={icons} item={service} />
                            </div>
                        </div>
                        {/* buttons - update,delete */}
                        <div className='w-full flex justify-between items-center'>
                            <button onClick={deleteServiceFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateServiceFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default ServiceCard;

// const icons = [
//     'email',
//     'address',
//     'phone',
// ]