import { Clear, Delete } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import { deleteFeatureCard, updateFeatureCard } from '../../../store/actions/admin/freelancing'
import { useDispatch } from "react-redux"
import { useStateContext } from "../../../contexts/ContextProvider"
import TextareaAutosize from "react-textarea-autosize"

// title quantity 
const FeatureCard = ({ featureCard }) => {

    const { freelancing, setFreelancing } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateFeatureCardFunc = () => {
        dispatch(updateFeatureCard(featureCard._id, featureCard))
        setFreelancing({ ...freelancing })
        setOpenModal(false)
    }

    const deleteFeatureCardFunc = () => {
        freelancing.featureCards = freelancing.featureCards.filter((f) => f._id !== featureCard._id)
        dispatch(deleteFeatureCard(featureCard._id))
        setFreelancing({ ...freelancing })
        setOpenModal(false)
    }

    const handleChange = (e) => {
        featureCard[e.target.name] = e.target.value
        setFreelancing({ ...freelancing })
    }






    return (
        <>

            <div onClick={() => setOpenModal(true)} className="relative p-[8px] rounded-[4px] bg-darkGray w-full">

                <div className=" bg-darkGray flex flex-col gap-[1rem] w-full " >
                    <p className={`border-none resize-none bg-inherit outline-none capitalize text-[20px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `}>
                        {featureCard.title || 'title'}
                    </p>
                    <p className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}>
                        {featureCard.quantity || 'quantity'}
                    </p>
                </div>

            </div>




            <Modal open={openModal} onClose={() => { setOpenModal(false); updateFeatureCardFunc() }}>
                <div className="max-h-[80%] overflow-y-scroll bg-darkGray border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[70%] w-[90%]" >
                    <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Title :</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Title'
                                value={featureCard.title}
                                name='title'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none capitalize text-[20px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Quantity :</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Quantity'
                                value={featureCard.quantity}
                                name='quantity'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteFeatureCardFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateFeatureCardFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}

export default FeatureCard;