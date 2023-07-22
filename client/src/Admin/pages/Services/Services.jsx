import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Textarea, Error } from "../../components"
import ServiceCard from './ServiceCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getServicesContent, updateForwardHeading, updateBackHeading, updateDetail, addService, createServicesFirstDocument, deleteServicesCollection } from '../../../store/actions/admin/services'

const Services = () => {
    const { initialServicesState, services, setServices } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.services)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getServicesContent())
    }, [])
    useEffect(() => {
        setServices({ ...services, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeForwardHeading = (text) => {
        services.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setServices({ ...services })
    }
    const changeBackHeading = (text) => {
        services.backHeading = text
        dispatch(updateBackHeading(text))
        setServices({ ...services })
    }
    const changeDetail = (text) => {
        services.detail = text
        dispatch(updateDetail(text))
        setServices({ ...services })
    }

    const addServiceFunc = () => {
        const serviceData = { icon: 'icon', service: 'service', link: 'link' }
        services.services = services.services.concat({ ...serviceData, _id: '' })
        dispatch(addService(serviceData))
        setServices({ ...services })
    }


    const createServicesSection = () => {
        dispatch(createServicesFirstDocument())
    }



    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.servicesDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createServicesSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Services Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="services"
                            deleteSection={deleteServicesCollection}
                            initialState={initialServicesState}
                            state={services}
                            setState={setServices}
                        />
                        <div className="flex flex-col gap-[1rem] " >
                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={services}
                                setState={setServices}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={services}
                                setState={setServices}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={services}
                                setState={setServices}
                            />


                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalizetext-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%]" >services :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="capitalize  text-[18px] text-textGray  " >{services.services.length}</p>

                                    <div className="flex flex-wrap md:flex-row sm:flex-col md:justify-start justify-center gap-[1rem] w-full " >
                                        {
                                            services.services.map((service, index) => (
                                                <div key={index} className="w-[20rem] h-[10rem] " >
                                                    {
                                                        service._id
                                                            ?
                                                            <ServiceCard service={service} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => addServiceFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Service</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Services
