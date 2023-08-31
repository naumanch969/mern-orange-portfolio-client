import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSkill } from '../../../redux/actions/skill'

const DeleteModal = ({ open, setOpen, skillId }) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.skill)
    
    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        dispatch(deleteSkill(skillId, setOpen))
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">
                Delete the Skill?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this skill?
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