import { profile } from "../../../assets"
import { MainHeading, Button } from "../../components"
import { motion } from "framer-motion"

const About = () => {

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
                <img src={profile} alt="profileImage" className="w-[40rem] h-[40rem] " />
            </div>

            {/* right side */}
            <div className="flex lg:w-[50%] flex-col md:px-8 " >

                {/* main heading */}
                <div className="w-full flex justify-center " >
                    <MainHeading
                        forwardHeading='About Me'
                        backHeading='About'
                        detail={`Greetings,

                        Welcome to my portfolio! I am Nauman Chaudhry, a seasoned MERN stack developer with an extensive background in the realm of web development. With over a year of dedicated experience, I have honed my skills and expertise to craft exceptional digital experiences.
                        
                        My journey is driven by a profound passion for coding, compelling me to continuously explore new horizons of technology and frameworks. I have been privileged to tackle an array of demanding projects throughout my career, ranging from comprehensive full-stack web applications to meticulously designed RESTful APIs. Leveraging the prowess of MongoDB, Express.js, React.js, and Node.js, I specialize in constructing web solutions that excel in both efficiency and scalability.
                        
                        In a world of perpetual evolution, I firmly uphold the values of perpetual learning and advancement. This ethos inspires me to remain at the forefront of industry trends, ensuring that my capabilities are always aligned with the latest innovations. During moments of respite, I find joy in contributing to open-source initiatives and immersing myself in thriving coding communities.
                        
                        Your presence on my portfolio website is greatly appreciated. Should you have any inquiries or aspire to embark on a collaborative project, I encourage you to reach out. Let's shape the future of the digital landscape together.
                        
                        Best regards,
                        Nauman Chaudhry`}
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
//                 <h4 className="text-gray min-h-[48px] " >name</h4>
//                 <h4 className="text-gray min-h-[48px] " >DOB</h4>
//                 <h4 className="text-gray min-h-[48px] " >address</h4>
//                 <h4 className="text-gray min-h-[48px] " >phone</h4>
//                 <h4 className="text-gray min-h-[48px] " >email</h4>
//             </div>
//         </div>

//         <div className="w-full mb-[2rem] gap-[1rem] flex flex-col items-between md:justify-start justify-center  " >
//             <h3 className="text-white text-[20px] " >10 proejcts completed</h3>
//             <Button text='Download CV' color="black" background="orange" />
//         </div>

//     </div>
// </div>