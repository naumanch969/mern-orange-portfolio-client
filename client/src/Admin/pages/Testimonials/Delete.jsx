import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTestimonial } from '../../../redux/actions/testimonial'

const DeleteModal = ({ open, setOpen, testimonialId }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.testimonial)
    
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteTestimonial(testimonialId, setOpen))
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">
                Delete the Testimonial?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this testimonial?
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