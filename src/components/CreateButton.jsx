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
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux/es/exports';
import { setNewEmployee } from '../features/employeeSlice';
import { addNewEmployee } from '../features/listSlice';

export default function CreateButton({employee}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDialogClose = (e, type) => {
        let target;
        switch (type) {
            case "new":
                target = "/";
                break;
            case "list":
                target = "employee-list";
                break;
            default:
                console.error("unknown target");
        }
        e.preventDefault();
        onAddNewEmployeeClicked({employee})
        navigate(`../${target}`, { replace: false });
        setOpenDialog(false);
    }

    const onAddNewEmployeeClicked = ({employee}) => {
        if (employee) {
            dispatch(setNewEmployee(employee));
            dispatch(addNewEmployee(employee))
        }
    }



    return (
        <Stack direction="row" spacing={2}>
            <Button 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                sx={{
                    color: 'rgb(147, 173, 24)', 
                    borderColor: 'rgb(147, 173, 24)',
                    '&:hover': {
                        borderColor: 'rgb(147, 173, 24)',
                        backgroundColor: 'rgb(147, 173, 24, 0.3)'
                    }
                }} 
                size="large"
            >
                Reset
            </Button>      
            <Button 
                variant="contained" 
                startIcon={<PersonAddAlt1Icon />} 
                size="large"
                onClick={handleDialogOpen}
                sx={{
                    backgroundColor: 'rgb(147, 173, 24)', 
                    '&:hover': {
                        color: 'white',
                        backgroundColor: 'rgb(110, 133, 16)',
                    }
                }}
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
                    <Button onClick={(e) => handleDialogClose(e, "new")}>Add Another Employee</Button> 
                    <Button href="/employee-list"  onClick={(e) => handleDialogClose(e, "list")} autoFocus>
                            View Current Employees
                    </Button>
                        
                </DialogActions>
            </Dialog>
        </Stack>
    );
}