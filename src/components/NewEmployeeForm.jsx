// @ts-nocheck
import React, { useState } from "react";
import USStates from "./USStates";
import Department from "./Department";
import CreateButton from './CreateButton';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from "@mui/material/Grid";
import Illustration from './Illustration';
import '../styles/NewEmployee.css';

export default function NewEmployeeForm() {

    // One state for each input field
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [birthDate, setBirthDate] = useState(null);
    const [addressStreet, setAddressStreet] = useState(undefined);
    const [addressCity, setAddressCity] = useState(undefined);
    const [addressState, setAddressState] = useState(undefined);
    const [addressZip, setAddressZip] = useState(undefined);
    const [companyDepartment, setCompanyDepartment] = useState(undefined);
    const [companyStartDate, setCompanyStartDate] = useState(null);

    // One method for each input field
    const handleFirstNameChanged = (e) => setFirstName(e.target.value);
    const handleLastNameChanged = (e) => setLastName(e.target.value);
    const handleBirthChange = (date) => {
        const shortenDate = date.toLocaleString('en-GB').split(',').shift().split('/').reverse().join("-");
        setBirthDate(shortenDate);
    }
    const handleStreetChange = (e) => setAddressStreet(e.target.value);
    const handleCityChange = (e) => setAddressCity(e.target.value);
    const handleZipChange = (e) => setAddressZip(e.target.value);
    const handleStartChange = (date) => {
        const shortenDate = date.toLocaleString('en-GB').split(',').shift().split('/').reverse().join("-");
        setCompanyStartDate(shortenDate);
    }

    // now we create an object with all the data gathered
    let employeeInfos = {
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "addressStreet": addressStreet,
        "addressCity": addressCity,
        "addressState": addressState,
        "addressZip": addressZip,
        "companyDepartment": companyDepartment,
        "companyStartDate": companyStartDate    
    }

    const [formReset, setFormReset] = useState(false);
    
    return (
        <div className="newEmployee">
            <div className="newEmployeeForm">
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
                                onChange={(e) => handleFirstNameChanged(e)}
                                onReset={(e) => handleFirstNameChanged(e)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="outlined-lastname" 
                                label="Last Name" 
                                variant="outlined" 
                                onChange={handleLastNameChanged}
                                onReset={handleLastNameChanged}
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
                                    onReset={handleBirthChange}
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
                                onChange={handleStreetChange}
                                onReset={handleStreetChange}
                            />
                        </Grid>
                        
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-city" 
                                label="City" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '20ch' }}
                                onChange={handleCityChange}
                                onReset={handleCityChange}
                            />
                        </Grid>

                        <Grid item>
                            <USStates uSState = {addressState} setUSState = {setAddressState} />
                        </Grid>
                        
                        <Grid item>
                            <TextField
                                id="filled-zip"
                                label="ZIP Code"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="e.g. 1234"
                                onChange={handleZipChange}
                                onReset={handleZipChange}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-position">
                    <h4>Company</h4>
                    <Grid container>
                        <Grid item>
                            <Department department = {companyDepartment} setDepartment = {setCompanyDepartment} />
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    required
                                    label="Start date *"
                                    inputFormat="MM/dd/yyyy"
                                    value={companyStartDate}
                                    onChange={handleStartChange}
                                    onReset={handleStartChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-button">
                    <Grid container={true} sx={{justifyContent: 'center', marginTop: 4}}>
                        <Grid item>
                            <CreateButton employee={employeeInfos} setReset = {setFormReset} />
                        </Grid>
                    </Grid>
                </div>
            </Box>
            </div>
            <div className="newEmployeeIllustration">
                <Illustration />
            </div>
        </div>
    )
}

