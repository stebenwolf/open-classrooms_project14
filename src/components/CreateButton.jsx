import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export default function CreateButton() {

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }


    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />} size="large">
                Reset
            </Button>      
            <Button 
                variant="contained" 
                startIcon={<PersonAddAlt1Icon />} 
                size="large"
                onClick={handleDialogOpen}
            >
                Create Employee
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Employee Successfully Added!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        What would you like to do now: add a new employee or view our current employees list?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Add Another Employee</Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        View Current Employees
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}