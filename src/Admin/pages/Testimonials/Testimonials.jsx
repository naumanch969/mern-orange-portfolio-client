import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getTestimonials } from "../../../redux/actions/testimonial"
import Create from "./Create"
import Update from "./Update"
import Delete from "./Delete"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Testimonials = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { testimonials, isFetching, error } = useSelector(state => state.testimonial)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => (<img src={params.row.image} alt={params.row.title} className="w-[2rem] h-[2rem] rounded-full object-cover " />) },
        { field: 'name', headerName: 'Name', width: 100, },
        { field: 'designation', headerName: 'Designation', width: 100, },
        { field: 'content', headerName: 'Content', width: 100, },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentTestimonial(params.row) }} ><Visibility /></IconButton>
                    <IconButton onClick={() => { setOpenUpdateModal(true); setCurrentTestimonial(params.row) }} ><Edit /></IconButton>
                    <IconButton onClick={() => { setOpenDeleteModal(true); setCurrentTestimonial(params.row) }} ><DeleteIcon /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentTestimonial, setCurrentTestimonial] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getTestimonials())
    }, [])


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <Create open={openCreateModal} setOpen={setOpenCreateModal} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} testimonial={currentTestimonial} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} testimonialId={currentTestimonial?._id} />
            <View open={openViewModal} setOpen={setOpenViewModal} testimonial={currentTestimonial} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="testimonials" setOpen={setOpenCreateModal} />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={testimonials}
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

export default Testimonials