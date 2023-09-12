import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getCards } from "../../../redux/actions/freelancing"
import Create from "./Create"
import Update from "./Update"
import Delete from "./Delete"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const Freelancing = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { cards, isFetching, error } = useSelector(state => state.freelancing)
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => (<img src={params.row.image} alt={params.row.title} className="w-[2rem] h-[2rem] rounded-full object-cover " />) },
        { field: 'title', headerName: 'Title', width: 150, },
        { field: 'description', headerName: 'Descrition', width: 200, },
        { field: 'link', headerName: 'Link', width: 100, },
        { field: 'parent', headerName: 'Parent', width: 100, },
        { field: 'category', headerName: 'Category', width: 100, },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentCard(params.row) }} ><Visibility /></IconButton>
                    <IconButton onClick={() => { setOpenUpdateModal(true); setCurrentCard(params.row) }} ><Edit /></IconButton>
                    <IconButton onClick={() => { setOpenDeleteModal(true); setCurrentCard(params.row) }} ><DeleteIcon /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [currentCard, setCurrentCard] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getCards())
    }, [])

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <Create open={openCreateModal} setOpen={setOpenCreateModal} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} card={currentCard} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} cardId={currentCard?._id} />
            <View open={openViewModal} setOpen={setOpenViewModal} card={currentCard} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="Freelancing" setOpen={setOpenCreateModal} />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={cards}
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

export default Freelancing