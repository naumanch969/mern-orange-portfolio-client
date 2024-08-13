import { motion } from "framer-motion"
import ServiceCard from './ServiceCard'
import { MainHeading } from "../../components"
import { useEffect } from "react"
import './service.css'
import { useDispatch, useSelector } from "react-redux"
import { getServices } from '../../../redux/actions/service'

const Services = () => {

    ////////////////////////////////////// VARIABLES /////////////////////////////////////////
    const dispatch = useDispatch()
    const { services } = useSelector(state => state.service)

    ////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
    useEffect(() => {
        dispatch(getServices())
    }, [])

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
                    forwardHeading='Services'
                    backHeading='Services'
                    detail='Empowering through innovation. My services are designed to transform ideas into impactful solutions, creating a bridge between vision and reality.'
                />
            </div>

            <div className="container relative flex flex-wrap md:justify-start justify-center gap-[24px] mt-[3rem] " >
                {
                    services.map((service, index) => (
                        <>
                            <ServiceCard
                                key={index}
                                service={service}
                                index={index}
                            />
                        </>
                    ))
                }

            </div>


        </motion.section>
    )
}

export default Services