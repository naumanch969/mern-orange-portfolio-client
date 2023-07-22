
import { Home, Phone, Mail, Public } from "@mui/icons-material"
import { motion } from "framer-motion"

import { MainHeading } from "../../components"
import ContactCard from './ContactCard'
import ContactForm from './ContactForm'

const Contact = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <motion.section
            name="contact"
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            className="flex flex-col md:h-auto h-[130rem] "
        >


            {/* contact main heading */}
            <div className="w-full flex justify-center " >
                <MainHeading
                    forwardHeading={content?.forwardHeading}
                    backHeading={content?.backHeading}
                    detail={content?.detail}
                />
            </div>

            {/* contact buttons */}
            <div className="w-full flex justify-center " >
                <div className="flex lg:justify-around sm:justify-center mt-[2rem] flex-wrap gap-[2rem] md:w-full sm:w-[80%] w-[90%]" >
                    {
                        content?.cards.map((card, index) => (
                            <ContactCard key={index} card={card} />
                        ))
                    }
                </div>
            </div>

            {/* contact form */}
            <div className="w-full flex justify-center  " >
                {content && <ContactForm content={content} />}
            </div>

        </motion.section>
    )
}
export default Contact;


const contacts = [
    {
        icon: <Home className="text-[30px] text-orange" />,
        title: 'Address',
        detail: 'Lahore Pakistan'
    },
    {
        icon: <Phone className="text-[30px] text-orange" />,
        title: 'Contact Number',
        detail: '+3055712534'
    },
    {
        icon: <Mail className="text-[30px] text-orange" />,
        title: 'Email Address',
        detail: 'naumanch969@gmail.com'
    },
    {
        icon: <Public className="text-[30px] text-orange" />,
        title: 'Website',
        detail: 'naumanch.info'
    },
]