import { Button, MainHeading } from "../../components"
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getCards } from '../../../redux/actions/freelancing'

const Freelancing = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { cards } = useSelector(state => state.freelancing)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getCards())
    }, [])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    const GigCard = ({ card }) => (
        <div
            className="w-[20rem] bg-lightGray p-[12px] rounded-[4px] flex flex-col gap-[1rem] "
        >
            <div className='flex flex-col gap-[4px] ' >
                <div className="w-full h-[12rem] rounded-t-[8px] " >
                    <img src={card?.image} alt="image" className="w-full h-full " />
                </div>
                <div className='flex flex-col gap-[4px] ' >
                    <h4 className="text-white text-[18px] " >{card?.title}</h4>
                    <p className="text-textGray" >{card?.description}</p>
                    <div className="w-full flex justify-end items-center " >
                        <h6 className="text-white capitalize font-light " >{card?.category}</h6>
                    </div>
                </div>
            </div>
            <button className='px-[8px] py-[2px] transition-all rounded-[4px] text-white border-[1px] border-white font-light hover:bg-orange hover:text-white ' >Visit</button>
        </div>
    )


    return (
        <motion.div
            name='freelancing'
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            className="flex flex-col gap-[3rem] "
        >

            {/* main heading */}
            <div className="w-full flex justify-center " >
                <MainHeading
                    forwardHeading='freelancing'
                    backHeading='freelancing'
                    detail=''
                />
            </div>


            <div className='flex flex-col gap-[3rem] ' >

                {/* lets work together */}
                <div className="relative w-full flex flex-col justify-center z-40 items-center md:gap-4 sm:px-[4rem] p-[1rem] " >
                    <h2 className="flex flex-col font-semibold lg:text-[48px] md:text-[44px] sm:tetx-[28px] text-[24px] text-center xs:w-full text-white z-40 " >
                        Crafting Web Excellence - Let's Collaborate and Thrive!
                    </h2>
                    <p className={`flex flex-col sm:gap-[1rem] gap-[8px] sm:text-[1rem] text-[14px] font-normal z-10  mb-4 text-gray mt-[10px] md:px-[100px] px-[30px] text-center `} >
                        As an experienced web developer, I am passionate about creating functional and visually appealing websites that meet my clients' unique needs. With a solid background in web technologies such as HTML, CSS, JavaScript, and frameworks like React and Node.js, I am well-equipped to handle a wide range of web development projects.
                        From designing responsive user interfaces to implementing robust back-end functionalities, I take a holistic approach to web development, ensuring seamless user experiences and optimal performance across devices. I am dedicated to delivering high-quality results that not only meet, but exceed my clients' expectations.
                        With my freelancing services, you can expect prompt communication, efficient project management, and timely deliveries. I value clear and transparent communication, and I am committed to understanding your requirements thoroughly to ensure that the end product aligns with your vision.
                        Whether you need a simple landing page, a complex web application, or anything in between, I am here to turn your ideas into reality. Let's collaborate and create a web solution that stands out in today's competitive online landscape. Contact me today to discuss your project and let's work together towards your online success!
                    </p>
                    <Button color="black" background="orange" text="Let's Work" />
                </div>


                {/* Fiverr */}
                <div className="flex flex-col justify-start items-center gap-[1rem]" >
                    <div className={`w-full h-full flex items-center justify-between gap-[1rem] sm:px-0 px-[2rem] `}>
                        <h4 className={`md:text-[54px] sm:text-[48px] text-[44px] text-orange font-medium capitalize italic `} >Fiverr</h4>
                    </div>
                    <div className="" >
                        <p className=" text-white " >Let's Connect on Fiverr</p>
                    </div>
                    {/* cards */}
                    <div className="flex flex-wrap justify-center gap-[1rem] w-full " >
                        {
                            cards?.map((card, index) => (
                                <GigCard card={card} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Freelancing

