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
                        detail={`
                        Greetings,
                        <br/>
I'm Nauman Chaudhry, a seasoned MERN stack developer with a passion for crafting exceptional digital experiences. With over a year of dedicated experience, I've had the privilege of working on a diverse range of projects. These include comprehensive full-stack web applications and meticulously designed RESTful APIs, all powered by technologies like MongoDB, Express.js, React.js, and Node.js.
                        <br/>
My commitment to continuous learning keeps me at the forefront of industry trends. I thrive on exploring new horizons in technology and contributing to open-source projects. Being an active part of coding communities brings me joy and enriches my knowledge.
                        <br/>
I sincerely appreciate your presence on my portfolio. Whether you have inquiries or a collaborative project in mind, please don't hesitate to reach out. Together, we can shape the future of the digital landscape.
                        <br/>
Best regards,
Nauman Chaudhry

                        `}
                        alignStart
                    />
                </div>

            </div>

        </motion.section>
    )
}

export default About
 