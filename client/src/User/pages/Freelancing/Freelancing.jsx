import { Button, MainHeading } from "../../components"
import { motion } from "framer-motion"
import { useState } from 'react'


const Freelancing = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [selectedFLIndex, setSelectedFLIndex] = useState(0)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const handleLeftClick = () => {
        // previous
    }
    // 2)
    const handleRightClick = () => {
        // next
    }


    const GigCard = ({ card }) => (
        <div
            className="w-[20rem] bg-lightGray p-[12px] rounded-[4px] flex flex-col gap-[1rem] "
        >
            <div className='flex flex-col gap-[4px] ' >
                <div className="w-full h-[12rem] rounded-t-[8px] " >
                    <img src={card.images[0]?.url} alt="image" className="w-full h-full " />
                </div>
                <div className='flex flex-col gap-[4px] ' >
                    <h4 className="text-white text-[18px] " >{card.title}</h4>
                    <p className="text-textGray" >{card.description}</p>
                    <div className="w-full flex justify-end items-center " >
                        <h6 className="text-white capitalize font-light " >{card.category}</h6>
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
                {
                    content &&
                    <MainHeading
                        forwardHeading='freelancing'
                        backHeading='freelancing'
                        detail=''
                    />
                }
            </div>


            <div className='flex flex-col gap-[3rem] ' >
                {/* statistic */}
                <div className=" flex justify-center flex-wrap gap-[1rem] " >
                    {
                        content?.featureCards.map((card, index) => (
                            <div key={index} className="bg-darkGray sm:mx-[1rem] mx-[1rem] md:w-fit sm:w-[70%] w-[80%] h-fit p-[1rem] rounded-[20px] flex flex-col justify-center items-center " >
                                <h3 className="text-orange font-[20px] text-[24px] text-center capitalize w-max " >{card.title}</h3>
                                <h3 className="text-white text-[44px] " >{card.quantity}</h3>
                            </div>
                        ))
                    }
                </div>


                {/* lets work together */}
                <div className="relative w-full flex flex-col justify-center z-40 items-center md:gap-4 sm:px-[4rem] p-[1rem] " >
                    <h2 className="flex flex-col font-semibold lg:text-[48px] md:text-[44px] sm:tetx-[28px] text-[24px] text-center xs:w-full text-white z-40 " >
                        {content?.heading?.split('-').map((heading, index) => (
                            <span key={index} className="" >{heading}</span>
                        ))}
                    </h2>
                    <p className={`flex flex-col sm:gap-[1rem] gap-[8px] sm:text-[1rem] text-[14px] font-normal z-10  mb-4 text-gray mt-[10px] md:px-[100px] px-[30px] text-center `} >
                        {content?.detail?.split('||').map((detail, index) => (
                            <span key={index} className="" >{detail}</span>
                        ))}
                    </p>
                    {content?.buttons[0] && <Button color="black" background="orange" text={content?.buttons[0]?.text} />}
                </div>


                {/* Fiverr */}
                <div className="flex flex-col justify-start items-center gap-[1rem]" >
                    <div className={`w-full h-full flex items-center justify-between gap-[1rem] sm:px-0 px-[2rem] `}>
                        <h4 className={`md:text-[54px] sm:text-[48px] text-[44px] text-orange font-medium capitalize italic `} >{content?.freelancingCards[selectedFLIndex]?.title}</h4>
                        {/* <div className='flex gap-[12px] ' >
                            <button onClick={handleLeftClick} className='w-[48px] h-[48px] bg-lightGray text-orange flex justify-center items-center rounded-full ' >
                                <West />
                            </button>
                            <button onClick={handleRightClick} className='w-[48px] h-[48px] bg-lightGray text-orange flex justify-center items-center rounded-full ' >
                                <East />
                            </button>
                        </div> */}
                    </div>
                    <div className="" >
                        <p className=" text-white " >{content?.freelancingCards[selectedFLIndex]?.detail}</p>
                    </div>
                    {/* cards */}
                    <div className="flex flex-wrap justify-center gap-[1rem] w-full " >
                        {
                            content?.freelancingCards[selectedFLIndex]?.cards.map((card, index) => (
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

