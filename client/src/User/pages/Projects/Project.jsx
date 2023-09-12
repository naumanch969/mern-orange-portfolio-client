import React, { useState } from 'react'
import { project1 } from '../../../assets'
import { IconButton, Modal, Tooltip } from '@mui/material'
import { Close, GitHub, Visibility } from '@mui/icons-material'

const Project = ({ project }) => {

    const [openModal, setOpenModal] = useState(false)


    return (
        <>
            <div onClick={() => setOpenModal(true)} className='md:w-[32%] sm:w-full w-full hover:scale-105 cursor-pointer transition-all h-[15rem] bg-lightGray rounded-[8px] relative border-[1px] border-orange overflow-hidden ' >

                <img src={project.image} alt={project.title} className='w-full h-full object-cover ' />

                <div className="w-full flex justify-center items-center">
                    <div style={{ background: 'rgb(254 185 49 / 60%)' }} className="max-w-[80%] w-fit px-[8px] rounded-[5px] absolute top-0 flex justify-center items-center text-center text-[20px] leading-[28px] font-semibold text-white">
                        {project.title}
                    </div>
                </div>

            </div>


            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >

                    <IconButton onClick={() => setOpenModal(false)} style={{ position: 'absolute' }} className='absolute top-[2px] right-[2px] ' ><Close style={{ color: 'white' }} /></IconButton>

                    <div className=" p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className="w-full h-[15rem] rounded-[8px] bg-lightGray overflow-hidden " >
                            <img src={project.image} alt="image" className="w-full h-full " />
                        </div>
                        <div className="flex flex-col w-full h-auto  justify-between items-start " >
                            <a className="text-white hover:text-orange text-[20px] font-semibold cursor-pointer no-underline " >{project.title}</a>
                            <p className="text-textGray text-[16px] " >{project.detail}</p>
                            <div className="w-full flex justify-between items-center mt-[1rem] " >
                                <div className='flex justify-start items-center gap-[8px] ' >
                                    <Tooltip title='Github' placement='top' >
                                        <a href={project.github} target='_blank' className='cursor-pointer w-[30px] h-[30px] flex justify-center items-center rounded-full transition-all text-white border-[1px] border-white font-light hover:bg-orange hover:text-white ' >
                                            <GitHub style={{ fontSize: '16px' }} />
                                        </a>
                                    </Tooltip>
                                    <Tooltip title='Visit' placement='top' >
                                        <a href={project.link} target='_blank' className='cursor-pointer w-[30px] h-[30px] flex justify-center items-center rounded-full transition-all text-white border-[1px] border-white font-light hover:bg-orange hover:text-white ' >
                                            <Visibility style={{ fontSize: '16px' }} />
                                        </a>
                                    </Tooltip>
                                </div>
                                <p className="text-white text-[16px] font-medium " >{project.technologies.map(tech => `#${tech}  `)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}

export default Project