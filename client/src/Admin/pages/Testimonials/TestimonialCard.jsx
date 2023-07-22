import { Clear, Camera, Delete } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState, useRef, useEffect } from "react"
import { updateTestimonial, deleteTestimonial } from '../../../store/actions/admin/testimonials'
import { useDispatch } from "react-redux"
import { useStateContext } from "../../../contexts/ContextProvider"
import TextareaAutosize from "react-textarea-autosize"
import { limitText } from '../../../utils/functions'
import FileBase64 from 'react-file-base64'



const TestimonialCard = ({ testimonial }) => {

    const { testimonials, setTestimonials, user } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const fileBase64Ref = useRef()
    const dispatch = useDispatch()
    const isAdmin = user?.tokens?.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [showImageCloseButton, setShowImageCloseButton] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [techValue, setTechValue] = useState('')

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeContent = (content) => {
        let testimonialData = { ...testimonial, content }
        dispatch(updateTestimonial(testimonial._id, testimonialData))
        setTestimonials({ ...testimonials })
    }
    const changeName = (name) => {
        let testimonialData = { ...testimonial, name }
        dispatch(updateTestimonial(testimonial._id, testimonialData))
        setTestimonials({ ...testimonials })
    }
    const changeDesignation = (designation) => {
        let testimonialData = { ...testimonial, designation }
        dispatch(updateTestimonial(testimonial._id, testimonialData))
        setTestimonials({ ...testimonials })
    }


    const updateTestimonialFunc = () => {
        dispatch(updateTestimonial(testimonial._id, testimonial))
        setOpenModal(false)
        setTestimonials({ ...testimonials })
    }


    const deleteTestimonialFunc = () => {
        dispatch(deleteTestimonial(testimonial._id))
        setTestimonials({ ...testimonials, testimonials: testimonials.testimonials.filter((t) => t._id !== testimonial._id) })
    }
    const handleChange = (e) => {
        testimonial[e.target.name] = e.target.value
        setTestimonials({ ...testimonials })
    }
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const { name, size, type, base64 } = files[0]
        const url = base64
        const image = { file: { name, size, type }, url }
        const testimonialData = { ...testimonial, image }
        testimonial.image = image
        setTestimonials({ ...testimonials })
    }
    const deleteTestimonialImageFunc = () => {
        testimonial.image = {}
        setTestimonials({ ...testimonials })
    }




    return (
        <div
            onMouseEnter={() => setShowCloseIcon(true)}
            onMouseLeave={() => setShowCloseIcon(false)}
            className="relative p-[8px] rounded-[4px] bg-darkGray w-full "
        >

            {/* testimonial delete button */}
            {
                showCloseIcon &&
                <button onClick={() => deleteTestimonialFunc()} className="absolute top-[4px] right-[4px] z-[10] "  >
                    <Clear />
                </button>
            }




            <div className="  overflow-y-scroll p-[8px] rounded-[4px] " >
                <div className=" bg-darkGray flex flex-col gap-[1rem] w-full " >
                    {/* <div className=" relative flex flex-col justify-start gap-[6px] w-full h-full " > */}

                    <div className="flex flex-col gap-[8px] items-center  " >
                        {/* gig testimonial */}
                        <div className=" relative flex flex-col justify-between gap-[6px] w-full h-full  " >
                            {
                                testimonial.image?.url
                                    ?
                                    <div className="w-full flex justify-center items-center " >
                                        <img src={testimonial.image.url} alt="image" style={{ width: '6rem', height: '6rem' }} className="w-[6rem] h-[6rem] " />
                                    </div>
                                    :
                                    <div className="w-full h-[180px] flex justify-center items-center " >
                                        <Camera style={{ fontSize: '48px' }} />
                                    </div>
                            }
                            <div onClick={() => setOpenModal(true)} className="w-full flex flex-col cursor-pointer " >
                                <p className={`text-[20px] text-white text-start w-full  `} >{testimonial.name || 'name'}</p>
                                <p className={`text-[16px] text-white text-start w-full  `} >{testimonial.designation || 'designation'}</p>
                                <p className={`text-[16px] text-textGray text-start w-full  `} >{limitText(testimonial.content, 120) || 'content'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Modal open={openModal} onClose={() => updateTestimonialFunc()} >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className="flex justify-center items-center " >
                            {
                                testimonial.image?.url
                                    ?
                                    <div
                                        onMouseEnter={() => setShowImageCloseButton(true)}
                                        onMouseLeave={() => setShowImageCloseButton(false)}
                                        className="relative w-[7rem] h-[7rem] p-[8px] rounded-full flex justify-center items-center  " >
                                        <img src={testimonial.image.url} alt="" className="rounded-full " />
                                        {<button onClick={() => deleteTestimonialImageFunc()} className="absolute top-[0px] right-[0px] text-white   " ><Clear /></button>}
                                    </div>
                                    :
                                    <div ref={fileBase64Ref} id="filebase_image" className=" w-[7rem] h-[7rem] p-[8px] rounded-full bg-lightGray  flex justify-center items-center " >
                                        <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center text-textGray  " >
                                            <Camera /> Add Photo
                                        </button>
                                        <FileBase64 type="file" multiple={true} onDone={(filesArr) => { addImageFunc(filesArr) }} />                                </div>
                            }
                        </div>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Name'
                            value={testimonial.name}
                            name='name'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Designation'
                            value={testimonial.designation}
                            name='designation'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Content'
                            value={testimonial.content}
                            name='content'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <div className="w-full flex justify-between items-center " >
                            <button onClick={deleteTestimonialFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateTestimonialFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px] " >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default TestimonialCard;