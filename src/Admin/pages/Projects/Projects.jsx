import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getProjects } from "../../../redux/actions/project"
import Create from "./Create"
import Update from "./Update"
import Delete from "./Delete"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Projects = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { projects, isFetching, error } = useSelector(state => state.project)
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => (<img src={params.row.image} alt={params.row.title} className="w-[2rem] h-[2rem] rounded-full object-cover " />) },
        { field: 'title', headerName: 'Title', width: 150, },
        { field: 'detail', headerName: 'detail', width: 200, },
        { field: 'link', headerName: 'Link', width: 100, },
        { field: 'github', headerName: 'Github', width: 100, },
        {
            field: 'technologies', headerName: 'Technologies', width: 150, renderCell: (params) => (
                <>{params.row.technologies.map((tech, index) => <span key={index} >#{tech} </span>)}</>
            )
        },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentProject(params.row) }} ><Visibility /></IconButton>
                    <IconButton onClick={() => { setOpenUpdateModal(true); setCurrentProject(params.row) }} ><Edit /></IconButton>
                    <IconButton onClick={() => { setOpenDeleteModal(true); setCurrentProject(params.row) }} ><DeleteIcon /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentProject, setCurrentProject] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getProjects())
    }, [])

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <Create open={openCreateModal} setOpen={setOpenCreateModal} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} project={currentProject} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} projectId={currentProject?._id} />
            <View open={openViewModal} setOpen={setOpenViewModal} project={currentProject} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="projects" setOpen={setOpenCreateModal} />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={projects}
                        columns={columns}
                        isFetching={isFetching}
                        error={error}
                        rowsPerPage={5}
                    />
                </div>

            </div>
        </div>
    )
}

export default Projects