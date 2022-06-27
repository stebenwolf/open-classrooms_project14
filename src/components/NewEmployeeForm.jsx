// @ts-nocheck
import React, { useState } from "react";
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

import { Autocomplete, FormHelperText } from '@mui/material';
import states from "../assets/data/states.json";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ModalContent from "./ModalContent";
import { Modal } from "@stebenwolf/react-modal";
import { Controller, useForm } from "react-hook-form";


export default function NewEmployeeForm() {

    const {reset, register, handleSubmit, control, formState, formState:{errors, isSubmitSuccessful}} = useForm(
         {defaultValues: {
            firstName: undefined,
            lastName: undefined,
            birthDate: null,
            addressStreet: undefined,
            addressCity: undefined,
            addressState: undefined,
            addressZip: undefined,
            companyDepartment: undefined,
            companyStartDate: null
         }}
    );
    const onSubmit= (data) => {
        onAddNewEmployeeClicked(data) // we create the employee
        setModal(!modal);
        console.log(data);
    }

    const firstNameValidators = {
        required:{value: true, message:'First name is required!'}
    };
    const lastNameValidators = {
        required:{value: true, message:'Last name is required!'}
    };
    const birthDateValidators = {
        required:{value: true, message:'Birth date is required!'}
    };
    const addressStreetValidators = {
        required:{value: true, message:'Street is required!'}
    };
    const addressCityValidators = {
        required:{value: true, message:'City is required!'}
    };
    const addressStateValidators = {
        required:{value: true, message:'State is required!'}
    };
    const addressZipValidators = {
        required:{value: true, message:'ZIP Code is required!'}
    };
    const companyDepartmentValidators = {
        required:{value: true, message:'Department is required!'}
    };
    const companyStartDateValidators = {
        required:{value: true, message:'Start date is required!'}
    };

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset])


    const dispatch = useDispatch();

    // One state for each input field
    //const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [birthDate, setBirthDate] = useState(null);
    const [addressStreet, setAddressStreet] = useState(undefined);
    const [addressCity, setAddressCity] = useState(undefined);
    const [addressState, setAddressState] = useState(undefined);
    const [addressZip, setAddressZip] = useState(undefined);
    const [companyDepartment, setCompanyDepartment] = useState("");
    const [companyStartDate, setCompanyStartDate] = useState(null);

    // One method for each input field
    //const handleFirstNameChanged = (e) => setFirstName(e.target.value);
    const handleLastNameChanged = (e) => setLastName(e.target.value);
    const handleDateChange = (date) => {
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
    /* let employeeInfos = {
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "addressStreet": addressStreet,
        "addressCity": addressCity,
        "addressState": addressState,
        "addressZip": addressZip,
        "companyDepartment": companyDepartment,
        "companyStartDate": companyStartDate    
    } */

    const stateOptions = states.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter,
            ...option,
        };
    });

    /* const [reset, setReset] = useState(false);
    const [fullForm, setFullForm] = useState(true); */

    const onAddNewEmployeeClicked = (employee) => {
        dispatch(setNewEmployee(employee));
        dispatch(addNewEmployee(employee))
    }

    /* const handleReset = () => {
        setReset(true);
    } */

    // Managing modal's state
    const [modal, setModal] = useState(false);
    
    // what happens when we click on the "create employee" button
    /* const toggleModal = (e) => {
        e.preventDefault();
        if(firstName && lastName && birthDate && addressStreet && addressCity && addressState && addressZip && companyDepartment && companyStartDate) {
            setFullForm(true);
            onAddNewEmployeeClicked(employeeInfos) // we create the employee
            setModal(!modal); // then we display the modal
            
        } else {
            setFullForm(false);
            if (firstName) {setFirstNameError(false)} else {setFirstNameError(true)};
            if (lastName) {setLastNameError(false)} else {setLastNameError(true)};
            if (birthDate) {setBirthDateError(false)} else {setBirthDateError(true)};
            if (addressStreet) {setAddressStreetError(false)} else {setAddressStreetError(true)};
            if (addressCity) {setAddressCityError(false)} else {setAddressCityError(true)};
            if (addressState) {setAddressStateError(false)} else {setAddressStateError(true)};
            if (addressZip) {setAddressZipError(false)} else {setAddressZipError(true)};
            if (companyDepartment) {setCompanyDepartmentError(false)} else {setCompanyDepartmentError(true)};
            if (companyStartDate) {setCompanyStartDateError(false)} else {setCompanyStartDateError(true)};
        }
    } */

    // field error
    /* const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [addressStreetError, setAddressStreetError] = useState(false);
    const [addressCityError, setAddressCityError] = useState(false);
    const [addressStateError, setAddressStateError] = useState(false);
    const [addressZipError, setAddressZipError] = useState(false);
    const [companyDepartmentError, setCompanyDepartmentError] = useState(false);
    const [companyStartDateError, setCompanyStartDateError] = useState(false); */
    
    /* const [formReset, setFormReset] = useState(false); */
    
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
                onSubmit={handleSubmit(onSubmit)}
                onReset={() => reset()}
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
                                //onChange={(e) => {}/* handleFirstNameChanged(e) */}
                                /* onReset={(e) => handleFirstNameChanged(e)} */
                                /* error={firstNameError}
                                helperText={firstNameError === true ? 'Empty field!' : ' '} */
                                {...register('firstName', firstNameValidators)}
                                error={errors.firstName !== undefined}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="outlined-lastname" 
                                label="Last Name" 
                                variant="outlined" 
                                //onChange={handleLastNameChanged}
                                //onReset={handleLastNameChanged}
                                /*error={lastNameError}
                                helperText={lastNameError === true ? 'Empty field!' : ' '} */
                                {...register('lastName', lastNameValidators)}
                                error={errors.lastName !== undefined}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/* <Controller 
                                    name="birthDate"
                                    control={control}
                                    defaultValue=''
                                    render={({field}) => {
                                        return <DesktopDatePicker
                                        required
                                        label="Date of Birth *"
                                        inputFormat="MM/dd/yyyy"
                                        value={birthDate}
                                        onChange={(date) => handleDateChange(date)}
                                        onReset={(e) => handleDateChange}
                                        renderInput={(params) => <TextField {...params} 
                                        
                                        {...register('birthDate', birthDateValidators)}
                                        error={errors.birthDate !== undefined}
                                        helperText={errors.birthDate?.message}
                                        value={field.value}
                                        
                                        />} 
                                        
                                    />
                                    }}
                                    /> */}
                                {/* <DesktopDatePicker
                                    required
                                    label="Date of Birth *"
                                    inputFormat="MM/dd/yyyy"
                                    value={birthDate}
                                    onChange={(date) => handleBirthChange(date)}
                                    onReset={(e) => handleBirthChange}
                                    renderInput={(params) => <TextField {...params} 
                                    
                                    
                                    {...register('birthDate', birthDateValidators)}
                                    error={errors.birthDate !== undefined}
                                    helperText={errors.birthDate?.message}
                                    />} 
                                    
                                /> */}
                                <DesktopDatePicker
                                    required
                                    label="Birth date *"
                                    inputFormat="MM/dd/yyyy"
                                    value={birthDate}
                                    control={control}
                                    onChange={(date) => handleDateChange(date)}
                                    //onReset={handleDateChange}
                                    renderInput={(params) => <TextField {...params} 
                                    {...register("birthDate", birthDateValidators)}
                                    error={errors.birthDate !== undefined}
                                    helperText={errors.birthDate?.message}
                                    
                                    />}
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
                                //onChange={handleStreetChange}
                                //onReset={handleStreetChange}
                                /* error={addressStreetError}
                                helperText={addressStreetError ? 'Empty field!' : " "} */
                                {...register('addressStreet', addressStreetValidators)}
                                error={errors.addressStreet !== undefined}
                                helperText={errors.addressStreet?.message}
                            />
                        </Grid>
                        
                        <Grid item>
                            <TextField 
                                required 
                                id="outlined-city" 
                                label="City" 
                                variant="outlined" 
                                sx={{ m: 1, minWidth: '20ch' }}
                                //onChange={handleCityChange}
                                //onReset={handleCityChange}
                                /* error={addressCityError}
                                helperText={addressCityError ? 'Empty field!' : " " } */
                                {...register("addressCity", addressCityValidators)}
                                error={errors.addressCity !== undefined}
                                helperText={errors.addressCity?.message}
                            />
                        </Grid>

                        <Grid item>
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                options={stateOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => `${option.name} (${option.abbreviation})`}
                                //onChange={(event) => setAddressState(event.target.textContent)}
                                
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        label="State" 
                                        sx={{ m: 1, minWidth: '15ch' }}
                                        /* error={addressStateError}
                                        helperText={addressStateError ? 'Empty field!' : " " } */
                                        {...register("addressState", addressStateValidators)}
                                        error={errors.addressState !== undefined}
                                        helperText={errors.addressState?.message}
                                />}
                            />
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
                                //onChange={handleZipChange}
                                //onReset={handleZipChange}
                                /* error={addressZipError}
                                helperText={addressZipError ? 'Empty field!' : " " } */
                                {...register("addressZip", addressZipValidators)}
                                error={errors.addressZip !== undefined}
                                helperText={errors.addressZip?.message}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="employee-position">
                    <h4>Company</h4>
                    <Grid container>
                        <Grid item>
                            <FormControl sx={{ m: 1, minWidth: '42ch' }} /* error={companyDepartmentError} */
                            error={errors.companyDepartment !== undefined}
                            >
                                <InputLabel required id="demo-simple-select-helper-label" variant='outlined'
                                
                                >Department</InputLabel>
                                <Controller 
                                    name="companyDepartment"
                                    control={control}
                                    defaultValue=''
                                    render={({field}) => {
                                        return <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={field.value/* companyDepartment */}
                                        label="Department *"
                                        //onChange={(event) => field.onChange(event.target.value) /* setCompanyDepartment(event.target.value) */}
                                        {...register("companyDepartment", companyDepartmentValidators)}
                                        
                                    >
                                        <MenuItem value="" disabled>None</MenuItem>
                                        <MenuItem value='Engineering'>Engineering</MenuItem>
                                        <MenuItem value='Human Resources'>Human Resources</MenuItem>
                                        <MenuItem value='Legal'>Legal</MenuItem>
                                        <MenuItem value='Marketing'>Marketing</MenuItem>
                                        <MenuItem value='Sales'>Sales</MenuItem>
                                    </Select>
                                    }}
                                    />
                                {/* <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={companyDepartment}
                                    label="Department *"
                                    onChange={(event) => setCompanyDepartment(event.target.value)}
                                    {...register("companyDepartment")}
                                >
                                    <MenuItem value="" disabled>None</MenuItem>
                                    <MenuItem value='Engineering'>Engineering</MenuItem>
                                    <MenuItem value='Human Resources'>Human Resources</MenuItem>
                                    <MenuItem value='Legal'>Legal</MenuItem>
                                    <MenuItem value='Marketing'>Marketing</MenuItem>
                                    <MenuItem value='Sales'>Sales</MenuItem>
                                </Select> */}
                                {<FormHelperText>{errors.companyDepartment?.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/* <Controller 
                                    name="companyStartDate"
                                    control={control}
                                    defaultValue=''
                                    render={({field}) => {
                                        return <DesktopDatePicker
                                        required
                                        label="Start Date *"
                                        inputFormat="MM/dd/yyyy"
                                        value={companyStartDate}
                                        renderInput={(params) => <TextField {...params} 
                                        
                                        onChange={(event) => field.onChange(event.target.value)}
                                        
                                        
                                        />} 
                                        {...register("companyStartDate", companyStartDateValidators)}
                                    error={errors.companyStartDate !== undefined}
                                    helperText={errors.companyStartDate?.message}
                                        
                                    />
                                    }}
                                    /> */}
                                <DesktopDatePicker
                                    required
                                    label="Start date *"
                                    inputFormat="MM/dd/yyyy"
                                    value={companyStartDate}
                                    control={control}
                                    onChange={(date) => handleStartChange(date)}
                                    //onReset={handleStartChange}
                                    renderInput={(params) => <TextField {...params} 
                                    {...register("companyStartDate", companyStartDateValidators)}
                                    error={errors.companyStartDate !== undefined}
                                    helperText={errors.companyStartDate?.message}
                                    />}
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
                                      /* onClick={handleReset} */
                                      type="reset"
                              >
                                      Reset
                              </Button>      
                              <Button 
                                variant="contained" 
                                startIcon={<PersonAddAlt1Icon />} 
                                size="large"
                                type="submit"
                                /* onClick={onSubmit} */
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

