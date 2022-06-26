// @ts-nocheck
import React, { useState } from "react";
/* import USStates from "./USStates"; */
import Department from "./Department";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from "@mui/material/Grid";
import Illustration from './Illustration';
import '../styles/NewEmployee.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useDispatch } from 'react-redux/es/exports';
import { setNewEmployee } from '../features/employeeSlice';
import { addNewEmployee } from '../features/listSlice';

import { Autocomplete } from '@mui/material';
import states from "../assets/data/states.json";


//import Modal from './Modal';
import ModalContent from "./ModalContent";
import { Modal } from "@stebenwolf/react-modal";


export default function NewEmployeeForm() {

    const dispatch = useDispatch();

    // One state for each input field
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [birthDate, setBirthDate] = useState(null);
    const [addressStreet, setAddressStreet] = useState(undefined);
    const [addressCity, setAddressCity] = useState(undefined);
    const [addressState, setAddressState] = useState(undefined);
    const [addressZip, setAddressZip] = useState(undefined);
    const [companyDepartment, setCompanyDepartment] = useState("");
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

    const stateOptions = states.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter,
            ...option,
        };
    });

    /* const {uSState, setUSState} = props; */

    const [reset, setReset] = useState(false);
    const [fullForm, setFullForm] = useState(false);

    const onAddNewEmployeeClicked = (employee) => {
        //if (fullForm) {
        if (1) {
            dispatch(setNewEmployee(employee));
            dispatch(addNewEmployee(employee))
        } else {
            console.error("infos manquantes");
        }
    }

    const handleReset = () => {
        setReset(true);
    }


    // Managing modal's state
    const [modal, setModal] = useState(false);
    
    // what happens when we click on the "create employee" button
    const toggleModal = (e) => {
        e.preventDefault();
        //if (firstName && lastName && birthDate) {
        if(true) {
            setFullForm(true);
        } 
        if (true) {
            onAddNewEmployeeClicked(employeeInfos) // we create the employee
            setModal(!modal); // then we display the modal
            handleReset(); // finally we reset the form
            //setFirstNameError(false)
        } else {
            console.error("non");
            //setFirstNameError(true);
        }
    }

    // field error
    const [firstNameError, setFirstNameError, lastNameError, setLastNameError, birthDateError, setBirthDateError, addressStreetError, setAddressStreetError, addressCityError, setAddressCityError, addressStateError, setAddressStateError, addressZipError, setAddressZipError, companyDepartmentError, setCompanyDepartmentError, companyStartDateError, setCompanyStartDateError] = useState(false);
    const errorText = "Invalid field";


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
                                /* error={firstNameError}
                                helperText={errorText} */
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
                                /* error={lastNameError}
                                helperText={errorText} */
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
                                    renderInput={(params) => <TextField {...params} /* error={firstNameError}
                                    helperText={errorText} */ />}
                                    
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
                                /* error={firstNameError}
                                    helperText={errorText} */
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
                                /* error={firstNameError}
                                    helperText={errorText} */
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                options={stateOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => `${option.name} (${option.abbreviation})`}
                                onChange={(event) => setAddressState(event.target.textContent)}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        label="State" 
                                        sx={{ m: 1, minWidth: '15ch' }}
                                />}
                            />
                            {/* <USStates uSState = {addressState} setUSState = {setAddressState} /> */}
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
                                /* error={firstNameError}
                                    helperText={errorText} */
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
                                    renderInput={(params) => <TextField {...params} /* error={firstNameError}
                                    helperText={errorText} */ />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-button">
                    <Grid container={true} sx={{justifyContent: 'center', marginTop: 4}}>
                        <Grid item>
                            {/* <CreateButton employee={employeeInfos} setReset = {setFormReset} /> */}
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
                                      onClick={handleReset}
                                      type="reset"
                              >
                                      Reset
                              </Button>      
                              <Button 
                                variant="contained" 
                                startIcon={<PersonAddAlt1Icon />} 
                                size="large"
                                onClick={toggleModal}
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
                            </Stack>
                            {modal && <Modal 
                                modalOpen={modal} 
                                setModalOpen={setModal} 
                                content={<ModalContent />} 
                                customBackStyle={{}}
                                customModalStyle={{}}
                                customCloseStyle={{}} />}
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

