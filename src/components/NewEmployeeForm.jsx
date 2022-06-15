// @ts-nocheck
import * as React from "react";
import USStates from "./USStates";
import Department from "./Department";
import CreateButton from './CreateButton';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from "@mui/material/Grid";

export default function NewEmployeeForm() {
    const [birthDate, setBirthDate] = React.useState(new Date('1990-01-31T21:11:54'));
    const [startDate, setStartDate] = React.useState(new Date());

    const handleBirthChange = (newValue) => {
        setBirthDate(newValue);
    };
    const handleStartChange = (newValue) => {
        setStartDate(newValue);
    };
    
    return (
        <div>
            <h1>Add New Employee</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root' : { m: 1, width: '20ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div className="employee-basicInfos">
                    <h4>Basic Information</h4>
                    <Grid container>
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-firstname" 
                                label="First Name" 
                                variant="outlined" 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="outlined-lastname" 
                                label="Last Name" 
                                variant="outlined" 
                            />
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    required
                                    label="Date of Birth *"
                                    inputFormat="MM/dd/yyyy"
                                    value={birthDate}
                                    onChange={handleBirthChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>

                <div className="employee-address">
                    <h4>Address</h4>
                    <Grid container>
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-street" 
                                label="Street" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '63.5ch' }}
                            />
                        </Grid>
                        
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-city" 
                                label="City" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '20ch' }}
                            />
                        </Grid>

                        <Grid item>
                            <USStates />
                        </Grid>
                        
                        <Grid item>
                            <TextField
                                id="filled-zip"
                                label="ZIP Code"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                /* variant="filled" */
                                placeholder="e.g. 1234"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-position">
                    <h4>Company</h4>
                    <Grid container>
                        <Grid item>
                            <Department />
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    required
                                    label="Start date *"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDate}
                                    onChange={handleStartChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-button">
                    <Grid container={true} sx={{justifyContent: 'center', marginTop: 4}}>
                        <Grid item>
                            <CreateButton />
                        </Grid>
                    </Grid>
                </div>
            </Box>
            
        </div>
    )
}

