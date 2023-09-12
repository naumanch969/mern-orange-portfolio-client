import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Error, Table } from "../../components"
import { Loading } from '../../../utils/Components'
import { getContactUsers } from "../../../redux/actions/contact"
import View from "./View"
import { Delete as DeleteIcon, Edit, Visibility } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const ContactUsers = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { contactUsers, isFetching, error } = useSelector(state => state.contact)
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200, },
        { field: 'email', headerName: 'Email', width: 200, },
        { field: 'subject', headerName: 'Subject', width: 200, },
        { field: 'message', headerName: 'Message', width: 300, },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (params) => (
                <div className="flex  ">
                    <IconButton onClick={() => { setOpenViewModal(true); setCurrentContactUser(params.row) }} ><Visibility /></IconButton>
                </div>
            )
        },
    ];

    ////////////////////////////// STATES /////////////////////////////////////////
    const [openViewModal, setOpenViewModal] = useState(false)
    const [currentContactUser, setCurrentContactUser] = useState(null)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getContactUsers())
    }, [])


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    if (isFetching) return <Loading />
    if (error) return <Error error={error} />

    return (
        <div className="w-full h-full "  >

            <View open={openViewModal} setOpen={setOpenViewModal} contactUser={currentContactUser} />

            <div className="flex flex-col gap-[2rem] " >

                <Heading title="Contact Users" />

                <div className="w-full flex flex-wrap md:flex-row sm:flex-col gap-[1rem] " >
                    <Table
                        rows={contactUsers}
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

export default ContactUsers