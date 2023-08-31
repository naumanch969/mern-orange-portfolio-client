import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteResume } from '../../../redux/actions/resume'

const DeleteModal = ({ open, setOpen, resumeId }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.resume)
    
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteResume(resumeId, setOpen))
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">
                Delete the Resume?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this resume?
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