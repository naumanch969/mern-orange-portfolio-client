import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

import { icons } from '../../../data'

const ServiceCard = ({ service, index }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    return (
        <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="lg:w-[31%] md:w-[48%] sm:w-[70%] w-[90%] min-h-[15rem] cursor-pointer border-gray border-[1px] bg-darkGray  "
        >
            <Link
                key={index}
                activeClass="active"   //class applied when element is reached
                smooth={true}
                spy={true}
                offset={-100}
                duration={300}
                to={service.link}
                className='w-full h-full flex flex-col items-center justify-evenly p-[2rem] text-white hover:text-orange'
            >
                {icons.map((icon, index) => (
                    icon.name.toLowerCase() == service.icon.toLowerCase()
                    &&
                    <icon.icon key={index} style={{ fontSize: '54px' }} />
                ))}
                <div className='flex flex-col items-center justify-center gap-[1rem] ' >
                    <h5 className="text-[20px] capitalize  font-semibold tracking-wider text-center" >{service.service}</h5>
                    <hr className="w-[30px] bg-orange " />
                </div>
            </Link>
        </motion.div>
    )
}



export default ServiceCard