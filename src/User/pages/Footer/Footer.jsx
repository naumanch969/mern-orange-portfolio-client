import { ArrowRightAlt, Email, LocationCity, Phone, } from "@mui/icons-material"
import { icons } from '../../../data'
import { IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { Link } from "react-scroll"

const Footer = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const links = [
        { name: 'Home', link: '/' },
        { name: 'Services', link: 'services' },
        { name: 'Skills', link: 'skills' },
        { name: 'Projects', link: 'proejcts' },
        { name: 'Contact', link: 'contact' },
    ]
    const services = [
        { name: 'MERN Stack Dev', link: 'services' },
        { name: 'Web Development', link: 'services' },
        { name: 'API Integration', link: 'services' },
        { name: 'Frontend Development', link: 'services' },
        { name: 'Backend Development', link: 'services' },
    ]
    const contacts = [
        { text: 'Sector H-12 Islamabad', link: '', icon: <LocationCity /> },
        { text: '+923055712534', link: '', icon: <Phone /> },
        { text: 'naumanch969@gmail.com', link: '', icon: <Email /> },
    ]

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////


    return (
        <motion.div
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            className="flex flex-col mt-[7rem] items-center w-full gap-12 mb-4 "
        >
            <div className="flex flex-col w-full md:flex-row lg:flex-nowrap md:flex-wrap lg:justify-between md:justify-around justify-start md:p-0 sm:px-[2rem] sm:py-[1rem] sm:gap-[1.5rem] p-[1rem] gap-[1.5rem] lg:gap-[8px] md:gap-[2rem] " >

                <div className="text-white flex justify-start md:flex-nowrap flex-wrap flex-col md:gap-[1rem] sm:gap-[12px] gap-[12px] lg:w-fit md:w-[15rem] lg:max-w-[15rem] " >
                    <div className='flex flex-col w-full gap-[1rem] '  >
                        <h3 className="text-[24px] font-semibold w-full" >About</h3>
                        <div className="flex flex-col jutify-between items-start gap-[24px] w-full text-textGray" >
                            <p className="" >I am a skilled MERN stack developer with over a year of experience in web development. Proficient in MongoDB, Express.js, React.js, and Node.js, I create efficient web solutions. I actively contribute to open-source projects and coding communities.</p>
                        </div>
                    </div>
                </div>

                <div className="text-white flex justify-start md:flex-nowrap flex-wrap flex-col md:gap-[1rem] sm:gap-[12px] gap-[12px] lg:w-fit md:w-[15rem] lg:max-w-[15rem] " >
                    <h3 className="text-[24px]  font-semibold   " >Links</h3>
                    <div className="flex flex-col gap-[1rem] " >
                        {
                            links.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.link}
                                    activeClass="active"   //class applied when element is reached
                                    smooth={true}
                                    spy={true}
                                    offset={-100}
                                    duration={300}
                                    className={`hover:text-orange flex items-center ${link.link && 'cursor-pointer'} text-gray text-[16px] gap-[4px] `}
                                >
                                    <button className='text-inherit ' ><ArrowRightAlt className='text-gray' /></button>
                                    <p className="" >{link.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="text-white flex justify-start md:flex-nowrap flex-wrap flex-col md:gap-[1rem] sm:gap-[12px] gap-[12px] lg:w-fit md:w-[15rem] lg:max-w-[15rem] " >
                    <h3 className="text-[24px]  font-semibold   " >Services</h3>
                    <div className='flex flex-col gap-[1rem] '  >
                        {
                            services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.link}
                                    activeClass="activet"   //class applied when element is reached
                                    smooth={true}
                                    spy={true}
                                    offset={-100}
                                    duration={300}
                                    className={`hover:text-orange flex items-center ${service.link && 'cursor-pointer'} text-gray text-[16px] gap-[4px] `}
                                >
                                    <button className='' ><ArrowRightAlt className='text-gray' /></button>
                                    <p className="" >{service.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="text-white flex justify-start md:flex-nowrap flex-wrap flex-col md:gap-[1rem] sm:gap-[12px] gap-[12px] lg:w-fit md:w-[15rem] lg:max-w-[15rem] " >
                    <h3 className="text-[24px]  font-semibold   " >Have a Question?</h3>
                    <div className="flex flex-col gap-[1rem]" >
                        {
                            contacts.map((contact, index) => (
                                <Link to="" key={index} className={`flex items-center ${contact?.link && 'cursor-pointer'} text-gray text-[16px] gap-[4px] `}  >
                                    {contact.icon}
                                    <p className="" >{contact.text}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div className="text-center " >
                <p className="text-gray" >Copyright - All Rights Resereved</p>
            </div>

        </motion.div>
    )
}

export default Footer

