import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../../redux/actions/project'

const DeleteModal = ({ open, setOpen, projectId }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.project)
    
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteProject(projectId, setOpen))
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">
                Delete the Project?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this project?
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