import { Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { deleteTestimonial, updateTestimonial } from '../../../redux/actions/testimonial'
import { Upload } from '../../../utils/Components'
import { deleteImageReducer } from '../../../redux/reducers/general'

const Update = ({ open, setOpen, testimonial }) => {

    ////////////////////////////////////// VARIABLES //////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.testimonial)
    const { url } = useSelector(state => state.general)

    ////////////////////////////////////// STATES ////////////////////////////////////
    const [testimonialData, setTestimonialData] = useState(testimonial)

    ////////////////////////////////////// USE EFFECTS /////////////////////////////////
    useEffect(() => {
        setTestimonialData(testimonial)
    }, [testimonial])
    useEffect(() => {
        setTestimonialData({ ...testimonialData, image: url })
    }, [url])

    ////////////////////////////////////// FUNCTIONS /////////////////////////////////
    const handleUpdateTestimonial = () => {
        dispatch(updateTestimonial(testimonialData._id, testimonialData, setOpen))
        dispatch(deleteImageReducer())
    }
    const handleChange = (e) => {
        setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value })
    }


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >
            <div className="sm:w-[20rem] w-[90%] max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] " >

                <div className="w-full flex justify-start items-center py-[12px] px-[8px] bg-lightGray text-white shadow-xl ">
                    <h3 className='text-[20px]   ' >Update Testimonial</h3>
                </div>

                <div className="p-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                    <div className="flex justify-center items-center w-full min-h-[10rem] bg-lightGray rounded-[8px] " >
                        <Upload image={testimonialData?.image} />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Name:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Name'
                            value={testimonialData?.name}
                            name='name'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Designation:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Designation'
                            value={testimonialData?.designation}
                            name='designation'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start  `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Content:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Content'
                            value={testimonialData?.content}
                            name='content'
                            onChange={handleChange}
                            minRows={5}
                            maxRows={5}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start overflow-y-scroll  `}
                        />
                    </div>
                    <div className='flex w-full justify-end gap-[8px] '>
                        <button onClick={() => setOpen(false)} className="bg-[#0d0d0d] text-white rounded-[4px] px-[6px] py-[4px]">
                            Close
                        </button>
                        <button onClick={handleUpdateTestimonial} className="bg-orange text-white rounded-[4px] px-[6px] py-[4px]" >
                            {isFetching ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default Update