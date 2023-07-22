import { Clear, Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState, useRef, useEffect } from "react"
import { updateResume, deleteResume, addResume } from '../../../store/actions/admin/resumes'
import { useDispatch } from "react-redux"
import { useStateContext } from "../../../contexts/ContextProvider"
import { limitText } from '../../../utils/functions'
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'
// {title category link github detail}
const ResumeCard = ({ resume }) => {

    const { resumes, setResumes, formattedDateTime } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dateTimeRef = useRef(null)
    const dispatch = useDispatch()
    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [showImageCloseButton, setShowImageCloseButton] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateResumeFunc = () => {
        dispatch(updateResume(resume._id, resume))
        setOpenModal(false)
    }
    const dateClick = () => {
        dateTimeRef.current.querySelector('input[type="datetime-local"]').click();
    }

    const deleteResumeFunc = () => {
        dispatch(deleteResume(resume._id))
        setResumes({
            ...resumes,
            resumes: resumes.resumes.filter((p) => p._id !== resume._id)
        })
    }

    const handleChange = (e) => {
        resume[e.target.name] = e.target.value
        setResumes({ ...resumes })
    }


    return (
        <div
            onMouseEnter={() => setShowCloseIcon(true)}
            onMouseLeave={() => setShowCloseIcon(false)}
            className="relative p-[8px] rounded-[4px] bg-darkGray w-full h-full "
        >

            {/* resume delete button */}
            {
                showCloseIcon &&
                <button onClick={deleteResumeFunc} className="absolute top-[4px] right-[4px] z-[10] "  >
                    <Clear />
                </button>
            }



            <div onClick={() => setOpenModal(true)} className="overflow-y-scroll flex flex-col gap-[1rem] w-full p-[8px] rounded-[4px] cursor-pointer" >
                <p className={`capitalize text-[16px] text-textGray `} >{resume.date}</p>
                <p className={`capitalize text-[20px] text-white `} >{resume.title}</p>
                <p className={`text-[16px] text-textGray `} >{resume.subTitle}</p>
                <p className={`text-[16px] text-textGray `} >{resume.detail}</p>
            </div>


            <Modal open={openModal} onClose={() => setOpenModal(false)}            >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Title'
                                value={resume.title}
                                name='title'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none capitalize text-[20px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Sub Title:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Sub Title'
                                value={resume.subTitle}
                                name='subTitle'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Timeline:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Date'
                                value={resume.date}
                                name='date'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Detail:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Detail'
                                value={resume.detail}
                                name='detail'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteResumeFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateResumeFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default ResumeCard;