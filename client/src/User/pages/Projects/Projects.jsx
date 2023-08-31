import { motion } from "framer-motion"

import { MainHeading } from "../../components"
import ProjectCard from './ProjectCard'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProjects } from "../../../redux/actions/project"


const Projects = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.project)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getProjects())
    }, [])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    return (
        <motion.section
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            name="projects"
            className="h-auto w-full flex flex-col "

        >

            <div className="w-full flex justify-center" >
                <MainHeading
                    forwardHeading='Projects'
                    backHeading='Projects'
                    detail='Transforming complex ideas into functional and intuitive web solutions that address unique needs and exceed user expectations with the latest web technologies and frameworks'
                />
            </div>

            <div className="flex flex-wrap md:justify-center justify-center gap-[8px] mt-[3rem] " >
                {
                    projects.map((project, index) => (
                        <ProjectCard project={project} index={index} key={index} />
                    ))
                }
            </div>

        </motion.section>
    )
}


export default Projects