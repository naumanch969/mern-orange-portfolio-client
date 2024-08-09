import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

const Confirm = ({ link, title, open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Continue to {title}?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By clicking Continue, you will leave this website and navigate to <span className='text-blue-500' >{title}.com</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button  >
                    <a href={link} target='_blank' onClick={() => setOpen(false)} >Continue</a>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirm