import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getResumes } from "../../../redux/actions/resume"
import Create from "./Create"
import Update from "./Update"
import Delete from "./Delete"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Resumes = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { resumes, isFetching, error } = useSelector(state => state.resume)
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 250, },
        { field: 'subTitle', headerName: 'Sub Title', width: 200, },
        { field: 'detail', headerName: 'Detail', width: 300, },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentResume(params.row) }} ><Visibility /></IconButton>
                    <IconButton onClick={() => { setOpenUpdateModal(true); setCurrentResume(params.row) }} ><Edit /></IconButton>
                    <IconButton onClick={() => { setOpenDeleteModal(true); setCurrentResume(params.row) }} ><DeleteIcon /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentResume, setCurrentResume] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getResumes())
    }, [])


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <Create open={openCreateModal} setOpen={setOpenCreateModal} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} resume={currentResume} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} resumeId={currentResume?._id} />
            <View open={openViewModal} setOpen={setOpenViewModal} resume={currentResume} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="resumes" setOpen={setOpenCreateModal} />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={resumes}
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

export default Resumes