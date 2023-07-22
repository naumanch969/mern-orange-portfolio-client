import { MainHeading, Button } from "../../components"
import { motion } from "framer-motion"

const About = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <motion.section
            name="about"
            className="h-auto w-full flex  "
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
        >

            {/* left side */}
            <div className="mx-4 px-4 lg:w-[50%] lg:block hidden justify-center " >
                <img src={content?.images[0]?.url} alt="profileImage" className="w-[40rem] h-[40rem] " />
            </div>

            {/* right side */}
            <div className="flex lg:w-[50%] flex-col md:px-8 " >

                {/* main heading */}
                <div className="w-full flex justify-center " >
                    <MainHeading
                        forwardHeading={content?.forwardHeading}
                        backHeading={content?.backHeading}
                        detail={content?.detail}
                        alignStart
                    />
                </div>

            </div>

        </motion.section>
    )
}

export default About



const aboutDetail = [
    {
        title: 'Name',
        detail: 'Nauman Chaudhry'
    },
    {
        title: 'Date of Birth',
        detail: 'December 10, 2004'
    },
    {
        title: 'Address',
        detail: 'Lahore Pakitan'
    },
    {
        title: 'Phone',
        detail: '+923055712534'
    },
    {
        title: 'Email',
        detail: 'naumanch969@gmail.com'
    }
]







// {/* detail */ }
// <div className="flex justify-center my-[2rem] w-full mt-[2rem] " >
//     <div className="flex flex-col items-center gap-[3rem] md:w-full sm:w-[70%] w-[90%] " >
//         <div className="flex md:justify-start justify-center gap-[3rem] w-full" >
//             <div className="flex flex-col gap-4 " >
//                 <h4 className="text-white min-h-[48px] capitalize " >name</h4>
//                 <h4 className="text-white min-h-[48px] capitalize " >DOB</h4>
//                 <h4 className="text-white min-h-[48px] capitalize " >address</h4>
//                 <h4 className="text-white min-h-[48px] capitalize " >phone</h4>
//                 <h4 className="text-white min-h-[48px] capitalize " >email</h4>
//             </div>
//             <div className='flex flex-col gap-4 ' >
//                 <h4 className="text-gray min-h-[48px] " >{content?.name}</h4>
//                 <h4 className="text-gray min-h-[48px] " >{content?.DOB}</h4>
//                 <h4 className="text-gray min-h-[48px] " >{content?.address}</h4>
//                 <h4 className="text-gray min-h-[48px] " >{content?.phone}</h4>
//                 <h4 className="text-gray min-h-[48px] " >{content?.email}</h4>
//             </div>
//         </div>

//         <div className="w-full mb-[2rem] gap-[1rem] flex flex-col items-between md:justify-start justify-center  " >
//             <h3 className="text-white text-[20px] " >{content?.subText}</h3>
//             <Button text={content?.buttons[0]?.text} color="black" background="orange" />
//         </div>

//     </div>
// </div>