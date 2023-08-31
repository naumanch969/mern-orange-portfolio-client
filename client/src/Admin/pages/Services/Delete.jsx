import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteService } from '../../../redux/actions/service'

const DeleteModal = ({ open, setOpen, serviceId }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.service)
    
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteService(serviceId, setOpen))
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">
                Delete the Service?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this service?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleDelete} autoFocus>
                    {isFetching ? 'Deleting' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default DeleteModal