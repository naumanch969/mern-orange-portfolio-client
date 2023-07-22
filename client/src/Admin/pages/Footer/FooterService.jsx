import { Delete } from "@mui/icons-material"
import { useState } from "react"
import { Modal } from '@mui/material'
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { updateService, deleteService } from '../../../store/actions/admin/footer'
import TextareaAutosize from "react-textarea-autosize"

const FooterService = ({ service }) => {
    const { footer, setFooter } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)   -   CRUD
    const updateServiceFunc = () => {
        dispatch(updateService(service._id, service))
        setOpenModal(false)
    }
    // 2)
    const deleteServiceFunc = () => {
        footer.services.services = footer.services.services.filter(s => s._id != service._id)
        dispatch(deleteService(service._id))
        setFooter({ ...footer })
    }
    // 3)   -   input change
    const handleChange = (e) => {
        service[e.target.name] = e.target.value
        setFooter({ ...footer })
    }
    // 4)   -   modal
    const closeModal = () => {
        setOpenModal(false);
        updateServiceFunc();
    }
    // 5)
    const toggleModal = () => {
        setOpenModal(true)
    }


    return (
        <>
            <div onClick={toggleModal} className="relative flex flex-col justify-evenly gap-[6px] w-full h-full py-[8px] px-[1rem] rounded-[4px] bg-darkGray ">

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Name:</h6>
                    <TextareaAutosize value={service.name} readOnly placeholder="name" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

                <div className="flex gap-[4px] " >
                    <h6 className={`capitalize lg:w-[25%] md:w-[30%] sm:w-[35%] w-[30%] text-[18px] text-white `}>Link:</h6>
                    <TextareaAutosize value={service.link} readOnly placeholder="link" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[75%] md:w-[70%] sm:w-[65%] w-[70%] ' />
                </div>

            </div>


            <Modal open={openModal} onClose={closeModal}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Name :</h6>
                            <TextareaAutosize
                                type="text"
                                name="name"
                                autoComplete='off'
                                placeholder="Name...."
                                value={service.name}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Link :</h6>
                            <TextareaAutosize
                                type="text"
                                name="link"
                                autoComplete='off'
                                placeholder="Link...."
                                value={service.link}
                                onChange={handleChange}
                                className={` resize-none border-none bg-inherit outline-none text-[18px] lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] text-textGray `}
                            />
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteServiceFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateServiceFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FooterService;