import { motion } from "framer-motion"

import ServiceCard from './ServiceCard'
import { MainHeading } from "../../components"

const Services = ({ content }) => {


    return (
        <motion.section
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            name="services"
            className="h-auto w-full flex flex-col "
        >

            <div className="w-full flex justify-center" >
                <MainHeading
                    forwardHeading={content?.forwardHeading}
                    backHeading={content?.backHeading}
                    detail={content?.detail}
                />
            </div>


            <div className="flex flex-wrap md:justify-start justify-center gap-[24px] mt-[3rem] " >
                {
                    content?.services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            index={index}
                        />
                    ))
                }
            </div>


        </motion.section>
    )
}

export default Services


const services = [
    {
        title: 'Web Design',
        icon: 'icon'
    },
    {
        title: 'Photo Editing',
        icon: 'icon'
    },
    {
        title: 'Web Development',
        icon: 'icon'
    },
    {
        title: 'MERN Stack Development',
        icon: 'icon'
    },
    {
        title: 'React js',
        icon: 'icon'
    },
]