import { motion } from "framer-motion"

import { MainHeading } from "../../components"
import ProjectCard from './ProjectCard'


const Projects = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

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
                    forwardHeading={content?.forwardHeading}
                    backHeading={content?.backHeading}
                    detail={content?.detail}
                />
            </div>

            <div className="flex flex-wrap md:justify-center justify-center gap-[8px] mt-[3rem] " >
                {
                    content?.projects.map((project, index) => (
                        <ProjectCard project={project} index={index} key={index} />
                    ))
                }
            </div>

        </motion.section>
    )
}


export default Projects