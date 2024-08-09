import React, { useEffect, useRef, useState } from 'react'
import { createProject } from '../../../redux/actions/project'
import { useDispatch, useSelector } from 'react-redux'
import { Camera, Clear, Close } from '@mui/icons-material'
import { Upload } from '../../../utils/Components'
import { Modal } from '@mui/material'
import TextareaAutosize from 'react-textarea-autosize'
import { DropDown } from '../../components'
import { icons } from '../../../data'
import FileBase64 from 'react-file-base64'
import { deleteImageReducer } from '../../../redux/reducers/general'

const Create = ({ open, setOpen }) => {

    /////////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()
    const { url } = useSelector(state => state.general)

    /////////////////////////////////////// STATES /////////////////////////////////////
    const [projectData, setProjectData] = useState({ image: '', title: '', detail: '', link: '', github: '', technologies: [] })
    const [techValue, setTechValue] = useState('')

    /////////////////////////////////////// STATES /////////////////////////////////////
    useEffect(() => {
        setProjectData({ ...projectData, image: url })
    }, [url])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleCreateProject = () => {
        dispatch(createProject(projectData, setOpen))
        dispatch(deleteImageReducer())
    }
    const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value })
    }

    const handleFilterTechnology = (techToDelete) => {
        setProjectData({ ...projectData, technologies: projectData.technologies.filter((t) => t !== techToDelete) })
    }
    const handleAddTechnology = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        projectData.technologies = projectData.technologies.concat(value)
        e.target.value = ""
        setTechValue('')
    }


    const Technology = ({ title }) => (
        <div className="flex gap-[8px] items-center justify-between rounded-[16px] py-[2px] px-[6px] bg-lightGray w-auto " >
            <p className="text-white font-medium w-max text-[14px] " >{title}</p>
            <Clear style={{ fontSize: '1rem' }} onClick={() => handleFilterTechnology(title)} className={`cursor-pointer text-white text-[1rem] bg-lightGray  rounded-full `} />
        </div>
    )


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >
            <div className="sm:w-[20rem] w-[90%] max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] " >

                <div className="w-full flex justify-start items-center py-[12px] px-[8px] bg-lightGray text-white shadow-xl ">
                    <h3 className='text-[20px]   ' >Create Project</h3>
                </div>

                <div className="p-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                    <div className="flex justify-center items-center w-full min-h-[10rem] bg-lightGray rounded-[8px] " >
                        <Upload image={projectData?.image} />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Title:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Title'
                            value={projectData?.title}
                            name='title'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Link:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Link'
                            value={projectData?.link}
                            name='link'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Github:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Github'
                            value={projectData?.github}
                            name='github'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Technologies:</h6>
                        <div className={`${projectData.technologies.length && 'py-[8px] '} px-[8px] flex flex-wrap gap-[8px] w-full bg-black min-h-[40px] rounded-[4px] `} >
                            {
                                projectData.technologies.map((tech, index) => (
                                    <Technology title={tech} key={index} />
                                ))
                            }
                            <input
                                className="border-none resize-none h-[40px] py-[8px] bg-inherit outline-none text-[14px] text-white w-full rounded-[4px] "
                                placeholder="Technologies - separated by enter"
                                value={techValue}
                                onChange={(e) => setTechValue(e.target.value)}
                                onKeyDown={handleAddTechnology}
                            />
                        </div>
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Detail:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Detail'
                            value={projectData?.detail}
                            name='detail'
                            onChange={handleChange}
                            minRows={5}
                            maxRows={5}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start overflow-y-scroll  `}
                        />
                    </div>
                    <div className='flex w-full justify-end gap-[8px] '>
                        <button onClick={() => { }} className="bg-[#0d0d0d] text-white rounded-[4px] px-[6px] py-[4px]">
                            Close
                        </button>
                        <button onClick={handleCreateProject} className="bg-orange text-white rounded-[4px] px-[6px] py-[4px]" >
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default Create