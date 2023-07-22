import { Circle } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { useState } from 'react'

const ProjectCard = ({ project, index }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    return (
        <div className={`h-fit min-h-[18rem] bg-darkGray flex ${index % 2 == 0 ? 'md:flex-row-reverse ' : 'md:flex-row'} flex-col sm:w-[25rem] md:w-full w-[80%] relative bg-darkGray rounded-[4px] `} >

            <div className='md:w-[55%] w-full sm:min-h-[18rem] rounded-[4px] overflow-hidden' >
                <img src={project.images[1].url} className={`${index % 2 == 0 ? 'md:rounded-l-[4px]' : 'md:rounded-r-[4px]'} lg:min-h-[18rem] md:min-h-[20rem] w-full h-full left-0 top-0 border-gray rounded-[4px]`} />
            </div>

            <div className="h-full md:w-[45%] w-full transition-all flex flex-col item-center justify-between gap-[8px] md:p-[1rem] p-[12px] "  >
                <div className='flex flex-col gap-[14px] ' >
                    <div className='flex flex-col gap-[8px] ' >
                        <h3 className="transition-all text-[24px] font-bold capitalize text-orange " >{project.title}</h3>
                        <h4 className="capitalize text-[14px] italic text-white font-light " >{project.technologies[0]}</h4>
                    </div>
                    <p className="text-white capitalize text-[1rem] font-light " >{project.detail}</p>
                </div>

                <div className='flex justify-end items-center gap-[8px] w-full ' >
                    <a href={project.github} target='_blank' className='cursor-pointer px-[8px] py-[2px] transition-all rounded-[4px] text-white border-[1px] border-white font-light hover:bg-orange hover:text-white ' >Github</a>
                    <a href={project.link} target='_blank' className='cursor-pointer px-[8px] py-[2px] transition-all rounded-[4px] text-white border-[1px] border-white font-light hover:bg-orange hover:text-white ' >Visit</a>
                </div>

            </div>
        </div>
    )
}

export default ProjectCard;