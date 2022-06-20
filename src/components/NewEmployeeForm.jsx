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
import { useSelector } from "react-redux";
import '../styles/NewEmployee.css';

export default function NewEmployeeForm() {
    const employee = useSelector(state => state.employee);

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [birthDate, setBirthDate] = useState(null);
    const [addressStreet, setAddressStreet] = useState(employee.addressStreet);
    const [addressCity, setAddressCity] = useState(employee.addressCity);
    const [addressState, setAddressState] = useState(employee.addressState);
    const [addressZip, setAddressZip] = useState(employee.addressZip);
    const [companyDepartment, setCompanyDepartment] = useState(employee.companyDepartment);
    const [companyStartDate, setCompanyStartDate] = useState(null);

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
        setCompanyStartDate(shortenDate);}

    
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
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="outlined-lastname" 
                                label="Last Name" 
                                variant="outlined" 
                                onChange={handleLastNameChanged}
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
                                onChange={handleStreetChange}
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
                                /* variant="filled" */
                                placeholder="e.g. 1234"
                                onChange={handleZipChange}
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
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-button">
                    <Grid container={true} sx={{justifyContent: 'center', marginTop: 4}}>
                        <Grid item>
                            <CreateButton employee={employeeInfos} />
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

