import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'


import { Heading, Textarea, Error } from "../../components"
import TestimonialCard from './TestimonialCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getTestimonialsContent, createTestimonialsContent, updateForwardHeading, updateBackHeading, updateDetail, addTestimonial, deleteTestimonialsCollection } from '../../../store/actions/admin/testimonials'

const Testimonials = () => {
    const { initialTestimonialsState, testimonials, setTestimonials } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    const { result, isLoading, isError, error } = useSelector(state => state.testimonials)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getTestimonialsContent())
    }, [])
    useEffect(() => {
        setTestimonials({ ...testimonials, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeForwardHeading = (text) => {
        testimonials.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setTestimonials({ ...testimonials })
    }
    const changeBackHeading = (text) => {
        testimonials.backHeading = text
        dispatch(updateBackHeading(text))
        setTestimonials({ ...testimonials })
    }
    const changeDetail = (text) => {
        testimonials.detail = text
        dispatch(updateDetail(text))
        setTestimonials({ ...testimonials })
    }


    const addTestimonialFunc = () => {
        const testimonialData = { content: '', name: '', designation: '', image: {} }
        testimonials.testimonials = testimonials.testimonials.concat({ ...testimonialData, _id: '' })
        dispatch(addTestimonial(testimonialData))
        setTestimonials({ ...testimonials })
    }


    const createTestimonialsSection = () => {
        dispatch(createTestimonialsContent())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.testimonialsDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createTestimonialsSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Testimonials Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="testimonials"
                            deleteSection={deleteTestimonialsCollection}
                            initialState={initialTestimonialsState}
                            state={testimonials}
                            setState={setTestimonials}
                        />
                        <div className="flex flex-col gap-[1rem] " >

                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={testimonials}
                                setState={setTestimonials}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={testimonials}
                                setState={setTestimonials}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={testimonials}
                                setState={setTestimonials}
                            />



                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >testimonials :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="capitalize  text-[18px] text-white  " >{testimonials.testimonials.length}</p>

                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            testimonials.testimonials.map((testimonial, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        testimonial._id
                                                            ?
                                                            <TestimonialCard testimonial={testimonial} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addTestimonialFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Testimonial</button>
                                    </div>

                                </div>
                            </div>





                        </div>


                    </div>
            }
        </div>
    )
}

export default Testimonials
