
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { Heading, Textarea, Error } from "../../components"
import ProjectCard from './ProjectCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getProjectsContent, updateForwardHeading, updateBackHeading, updateDetail, addProject, deleteProject, createProjectsFirstDocument, deleteProjectsCollection } from '../../../store/actions/admin/projects'

const Projects = () => {
    const { initialProjectsState, projects, setProjects } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.projects)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getProjectsContent())
    }, [])
    useEffect(() => {
        setProjects({ ...projects, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)
    const changeForwardHeading = (text) => {
        projects.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setProjects({ ...projects })
    }
    // 2)
    const changeBackHeading = (text) => {
        projects.backHeading = text
        dispatch(updateBackHeading(text))
        setProjects({ ...projects })
    }
    // 3)
    const changeDetail = (text) => {
        projects.detail = text
        dispatch(updateDetail(text))
        setProjects({ ...projects })
    }
    // 4)
    const addProjectFunc = () => {
        const projectData = {
            title: 'title',
            technologies: ['react js'],
            link: 'http:www.link.com',
            github: 'http:www.github.com/github-link',
            detail: 'lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar',
            images: []
        }
        projects.projects = projects.projects.concat({ ...projectData, _id: '' })
        dispatch(addProject(projectData))
        setProjects({ ...projects })
    }
    // 5)
    const createProjectsSection = () => {
        dispatch(createProjectsFirstDocument())
    }

    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.projectsDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createProjectsSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Projects Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="projects"
                            deleteSection={deleteProjectsCollection}
                            initialState={initialProjectsState}
                            state={projects}
                            setState={setProjects}
                        />
                        <div className="flex flex-col gap-[1rem] " >

                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={projects}
                                setState={setProjects}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={projects}
                                setState={setProjects}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={projects}
                                setState={setProjects}
                            />

                            {/* project cards */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >projects :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="capitalize  text-[18px] text-white  " >{projects.projects.length}</p>
                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            projects.projects.map((project, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        project._id
                                                            ?
                                                            <ProjectCard project={project} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addProjectFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Project</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}
export default Projects