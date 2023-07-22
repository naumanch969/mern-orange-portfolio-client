import { Delete, Clear, Camera } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'

import { updateProject, deleteProject } from '../../../store/actions/admin/projects'
import { useStateContext } from "../../../contexts/ContextProvider"
import { limitText } from '../../../utils/functions'
import { Slider } from '../../components'


// title category link github detail
const ProjectCard = ({ project }) => {
    const { projects, setProjects } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const fileBase64Ref = useRef(null)
    const dateTimeRef = useRef(null)
    const dispatch = useDispatch()
    const findedImages = project.images.filter(i => i.url !== '')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)
    const [techValue, setTechValue] = useState('')

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)   -   CRUD
    const updateProjectFunc = () => {
        dispatch(updateProject(project._id, project))
        setProjects({ ...projects })
        setOpenModal(false)
    }
    // 2)
    const deleteProjectFunc = () => {
        dispatch(deleteProject(project._id))
        setProjects({ ...projects, projects: projects.projects.filter((p) => p._id !== project._id) })
        setOpenModal(false)
    }
    // 3)   -   image
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    // 4)
    const addImageFunc = (files) => {
        const uploaded = [...project.images]
        files.some((file) => {
            const { name, size, type, base64 } = file
            const url = base64
            uploaded.concat({ file: { name, size, type }, url });
        })
        project.images = uploaded
        setProjects({ ...projects })
    }
    // 5)
    const deleteProjectImageFunc = (imageId) => {
        project.images = project.images.filter((img) => img._id !== imageId)
        setProjects({ ...projects })
        dispatch(updateProject(project._id, project));  // for backend
    }
    // 6)   -   date click
    const dateClick = () => {
        dateTimeRef.current.querySelector('input[type="datetime-local"]').click();
    }
    // 7)   -   input change
    const handleChange = (e) => {
        project[e.target.name] = e.target.value
        setProjects({ ...projects })
    }
    // 8)   -   tags/technologies
    const handleFilterTechnology = (techToDelete) => {
        project.technologies = project.technologies.filter((t) => t !== techToDelete)
        setProjects({ ...projects })
    }
    // 9)
    const handleAddTechnology = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        project.technologies = project.technologies.concat(value)
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
        <>

            <div className="bg-darkGray relative flex flex-col justify-start gap-[6px] w-full h-full p-[8px] rounded-[4px]" >
                <div className="w-full h-[180px] flex justify-center items-center " >
                    <Slider images={findedImages} />
                </div>
                <div onClick={() => setOpenModal(true)} className="flex flex-col gap-[8px] cursor-pointer " >
                    <span className="flex flex-wrap gap-[8px] " >{project.technologies?.map((tech, index) => (<p key={index} className="italic text-[12px] text-textGray " >#{tech}</p>))}</span>
                    <span className="w-full " > <p className="text-[20px] text-white   captalize text-start w-full " >{project.title}</p></span>
                    <span className="w-full " > <p className="text-[14px] text-textGray text-start w-full " >{project.category}</p></span>
                    <span className="w-full " > <p className="text-[12px] text-linkBlue text-start w-full " >{project.link}</p></span>
                    <span className="w-full " > <p className="text-[12px] text-linkBlue text-start w-full " >{project.github}</p></span>
                    <span className="w-full " > <p className="text-[14px] text-textGray text-start w-full " >{limitText(project.detail, 100)}</p></span>
                </div>
            </div>


            <Modal open={openModal} onClose={() => setOpenModal(false)}            >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        {/* images */}
                        {
                            findedImages.length
                                ?
                                <div className="relative h-[12rem] w-full " >
                                    <Slider images={findedImages} deleteImageFunc={deleteProjectImageFunc} addImageFunc={addImageFunc} sliderInModal />
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" className="w-full min-h-[10rem] max-h-[12rem] flex justify-center items-center " >
                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center text-textGray  " >
                                        <Camera />
                                        Add Photo
                                    </button>
                                    <FileBase64 type="file" multiple={true} onDone={(filesArr) => { addImageFunc(filesArr) }} />
                                </div>
                        }
                        {/* date */}
                        <div ref={dateTimeRef} id="filebase_image" className="w-full flex flex-col" >
                            <button onClick={() => dateClick()} className={`border-none bg-inherit outline-none text-textGray text-start w-fit `}                        >{project.date}</button>
                            {/* <input
                                type="datetime-local"
                                onChange={(e) => changeProjectDate(e.target.value)}
                                className={`border-none resize-none bg-inherit outline-none w-[200px] text-textGray  `}
                            /> */}
                        </div>
                        {/* title */}
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Project Title'
                            name='title'
                            value={project.title}
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[24px] text-white capitalize text-start w-full min-w-[10rem] max-w-[100%]   `}
                        />
                        {/* tags */}
                        <div className="flex flex-wrap gap-[8px] " >
                            {
                                project.technologies.map((tech, index) => (
                                    <Technology title={tech} key={index} />
                                ))
                            }
                            <input
                                className="border-none resize-none bg-inherit outline-none text-[14px] text-white   w-full"
                                placeholder="Technologies - separated by enter"
                                value={techValue}
                                onChange={(e) => setTechValue(e.target.value)}
                                onKeyDown={handleAddTechnology}
                            />
                        </div>
                        {/* github */}
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Github'
                            value={project.github}
                            name='github'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[14px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        {/* link */}
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Link'
                            value={project.link}
                            name='link'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[14px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        {/* detail */}
                        <TextareaAutosize
                            minRows={1}
                            maxRows={2}
                            type='text'
                            autoComplete='off'
                            placeholder='Detail'
                            value={project.detail}
                            name='detail'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[14px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <div className='w-full flex justify-between items-center'>
                            <button onClick={deleteProjectFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateProjectFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default ProjectCard;