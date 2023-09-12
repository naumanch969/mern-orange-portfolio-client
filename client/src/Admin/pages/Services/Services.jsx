import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getServices } from "../../../redux/actions/service"
import Create from "./Create"
import Update from "./Update"
import Delete from "./Delete"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Services = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { services, isFetching, error } = useSelector(state => state.service)
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'service', headerName: 'Service', width: 150, },
        { field: 'link', headerName: 'Link', width: 100, },
        { field: 'icon', headerName: 'Icon', width: 100, },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentService(params.row) }} ><Visibility /></IconButton>
                    <IconButton onClick={() => { setOpenUpdateModal(true); setCurrentService(params.row) }} ><Edit /></IconButton>
                    <IconButton onClick={() => { setOpenDeleteModal(true); setCurrentService(params.row) }} ><DeleteIcon /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentService, setCurrentService] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getServices())
    }, [])


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <Create open={openCreateModal} setOpen={setOpenCreateModal} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} service={currentService} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} serviceId={currentService?._id} />
            <View open={openViewModal} setOpen={setOpenViewModal} service={currentService} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="services" setOpen={setOpenCreateModal} />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={services}
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

export default Services