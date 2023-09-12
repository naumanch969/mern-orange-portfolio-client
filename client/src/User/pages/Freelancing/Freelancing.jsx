import { Button, MainHeading } from "../../components"
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getCards } from '../../../redux/actions/freelancing'
import { Link } from "react-router-dom"
import Confirm from './Confirm'

const Freelancing = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { cards } = useSelector(state => state.freelancing)
    const names = [
        {
            name: 'Fiverr',
            link: '#'
        },
        {
            name: 'Upwork',
            link: '#'
        },
        {
            name: 'Freelancer',
            link: '#'
        },
    ]

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openConfirm, setOpenConfirm] = useState(false)
    const [selectedWeb, setSelectedWeb] = useState({ name: '', link: '' })

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getCards())
    }, [])

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////


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
                    small
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
                    <p className={` lg:w-[70%] w-full flex flex-col sm:gap-[1rem] gap-[8px] sm:text-[1rem] text-[14px] font-normal z-10  mb-4 text-gray mt-[10px] md:px-[100px] px-[30px] text-center `} >
                        As an experienced web developer, I am passionate about creating functional and visually appealing websites that meet my clients' unique needs. With a solid background in web technologies such as HTML, CSS, JavaScript, and frameworks like React and Node.js, I am well-equipped to handle a wide range of web development projects.
                        <br />
                        <br />
                        From designing responsive user interfaces to implementing robust back-end functionalities, I take a holistic approach to web development, ensuring seamless user experiences and optimal performance across devices. I am dedicated to delivering high-quality results that not only meet, but exceed my clients' expectations.
                        <br />
                        <br />
                        With my freelancing services, you can expect prompt communication, efficient project management, and timely deliveries. I value clear and transparent communication, and I am committed to understanding your requirements thoroughly to ensure that the end product aligns with your vision.
                        <br />
                        <br />
                        Whether you need a simple landing page, a complex web application, or anything in between, I am here to turn your ideas into reality. Let's collaborate and create a web solution that stands out in today's competitive online landscape. Contact me today to discuss your project and let's work together towards your online success!
                    </p>
                    <Button color="black" background="orange" text="Let's Work" />
                </div>


                {/* Fiverr */}
                <div className="flex flex-col justify-start items-center gap-[1rem]" >

                    {/* cards */}
                    <div className="flex flex-wrap justify-between gap-[1rem] w-full sm:p-0 p-[2rem] " >
                        {
                            names.map((name, index) => (
                                <div
                                    onClick={() => { setOpenConfirm(true); setSelectedWeb({ name: name.name, link: name.link }) }}
                                    className="cursor-pointer flex justify-center items-center bg-lightGray text-white hover:transform hover:scale-105 hover:rotate-3 hover:shadow-lg transition-transform hover:z-[100] hover:text-orange text-[2rem] font-semibold sm:w-[30%] w-full h-[14rem] rounded-[6px] border-[1px] border-white hover:border-orange transition-border duration-300 ease-in-out"
                                    key={index}
                                >
                                    {name.name}
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>

            <Confirm open={openConfirm} setOpen={setOpenConfirm} title={selectedWeb.name} link={selectedWeb.link} />

        </motion.div>
    )
}

export default Freelancing

